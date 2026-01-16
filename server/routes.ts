import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { services, projects } from "../shared/schema";
import { getDb, ObjectId } from "./mongodb";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio API routes
  app.get("/api/services", async (_req, res) => {
    try {
      const db = await getDb();
      const dbServices = await db.collection("services").find({}).toArray();
      console.log(`Fetched ${dbServices.length} services from MongoDB`);
      if (dbServices.length > 0) {
        return res.json(dbServices.map(s => ({ ...s, id: s._id.toString() })));
      }
    } catch (e) {
      console.error("MongoDB error, falling back to static services", e);
    }
    console.log("Using static services fallback");
    res.json(services);
  });

  app.get("/api/services/:slug", async (req, res) => {
    try {
      const db = await getDb();
      const service = await db.collection("services").findOne({ slug: req.params.slug });
      if (service) {
        return res.json({ ...service, id: service._id.toString() });
      }
    } catch (e) {
      console.error("MongoDB error", e);
    }
    const service = services.find(s => s.slug === req.params.slug);
    if (!service) return res.status(404).send("Service not found");
    res.json(service);
  });

  app.get("/api/projects/service/:slug", async (req, res) => {
    try {
      const db = await getDb();
      const slug = req.params.slug;
      if (!slug || slug === "undefined") {
        console.log("Received invalid slug in projects request");
        return res.json([]);
      }

      console.log(`[API] Fetching projects for slug: ${slug}`);
      const service = await db.collection("services").findOne({ slug: slug });
      
      let query: any = {};

      if (service) {
        const serviceIdStr = service._id.toString();
        console.log(`[API] Found service: ${service.title} (${serviceIdStr})`);
        query = {
          $or: [
            { serviceId: service._id },
            { serviceId: serviceIdStr },
            { serviceSlug: slug },
            { category: slug },
            { serviceName: service.title }
          ]
        };
      } else {
        query = { 
          $or: [
            { serviceSlug: slug },
            { category: slug }
          ]
        };
      }

      const dbProjects = await db.collection("projects").find(query).toArray();

      console.log(`[API] Successfully fetched ${dbProjects.length} projects for ${slug}`);
      return res.json(dbProjects.map(p => {
        // Handle MongoDB ObjectId conversion safely
        const id = p._id?.toString() || "";
        const serviceId = p.serviceId?.toString() || "";
        
        console.log(`[API] Mapping project ${p.name}: id=${id}, serviceId=${serviceId}`);
        
        // Comprehensive field mapping to support multiple sources/field naming conventions
        const galleryImages = Array.isArray(p.galleryImages) && p.galleryImages.length > 0 ? p.galleryImages : 
                             (Array.isArray(p.images) && p.images.length > 0 ? p.images : 
                             (Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : 
                             (p.gallery_images && Array.isArray(p.gallery_images) ? p.gallery_images : [])));
                             
        const imageUrl = p.imageUrl || p.image || p.image_url || p.thumbnail || p.cover || (galleryImages.length > 0 ? galleryImages[0] : "");

        // FORCED FIX FOR BARREL BORN FILENAME MISMATCH
        let finalImageUrl = imageUrl;
        if (p.name === "Barrel Born Digital Menu" || p.slug === "barrel-born-digital-menu") {
          finalImageUrl = "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_176760_1768561455685.png";
        }

        // Log project mapping for debugging
        if (p.name === "Barrel Born Digital Menu") {
          console.log(`[API] Mapping project Barrel Born Digital Menu:`, {
            id,
            imageUrl,
            galleryCount: galleryImages.length,
            galleryFirst: galleryImages[0]
          });
        }

        return { 
          ...p, 
          id,
          serviceId,
          imageUrl: finalImageUrl,
          galleryImages: galleryImages.map(img => 
            (p.name === "Barrel Born Digital Menu" && img.includes("1767605011722")) 
            ? "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_176760_1768561455685.png" 
            : img
          ),
          // Support for other common fields
          description: p.description || p.fullDescription || p.detail || "",
          technologies: p.technologies || p.techStack || p.tech || [],
          clientName: p.clientName || p.client || "",
          duration: p.duration || p.timeframe || ""
        };
      }));

      // Broadest possible fallback
      const allProjects = await db.collection("projects").find({}).toArray();
      const filtered = allProjects.filter(p => {
        const sid = p.serviceId?.toString() || "";
        const targetSid = service?._id?.toString() || "";
        const pSlug = p.serviceSlug || p.category || "";
        return sid === targetSid || pSlug.toLowerCase() === slug.toLowerCase();
      });

      if (filtered.length > 0) {
        console.log(`[API] Fetched ${filtered.length} projects via broad filter fallback for ${slug}`);
        return res.json(filtered.map(p => ({ ...p, id: p._id.toString() })));
      }

      console.log(`[API] No projects found for ${slug} in MongoDB.`);
    } catch (e) {
      console.error("[API] MongoDB error", e);
    }
    
    const staticService = services.find(s => s.slug === req.params.slug);
    if (!staticService) return res.json([]);
    const filtered = projects.filter(p => p.serviceId === staticService.id);
    console.log(`[API] Falling back to ${filtered.length} static projects for ${req.params.slug}`);
    res.json(filtered);
  });

  app.get("/api/projects/:projectId", async (req, res) => {
    try {
      const db = await getDb();
      const projectId = req.params.projectId;
      
      let project;
      if (ObjectId.isValid(projectId)) {
        project = await db.collection("projects").findOne({ _id: new ObjectId(projectId) });
      } else {
        // Support lookup by slug if ID is not a valid ObjectId
        project = await db.collection("projects").findOne({ 
          $or: [
            { slug: projectId },
            { name: { $regex: new RegExp(`^${projectId.replace(/-/g, ' ')}$`, 'i') } }
          ]
        });
      }

      if (project) {
        // Return all fields from MongoDB to the frontend
        return res.json({ 
          ...project, 
          id: project._id.toString(), 
          serviceId: project.serviceId?.toString(),
          imageUrl: project.imageUrl || project.image || project.image_url,
          galleryImages: project.galleryImages || project.images || project.gallery || []
        });
      }
    } catch (e) {
      console.error("MongoDB error", e);
    }
    const project = projects.find(p => p.id === req.params.projectId);
    if (!project) return res.status(404).send("Project not found");
    res.json(project);
  });

  app.get("/api/projects/:serviceSlug/:projectId", async (req, res) => {
    try {
      const db = await getDb();
      const projectId = req.params.projectId;

      let project;
      if (ObjectId.isValid(projectId)) {
        project = await db.collection("projects").findOne({ _id: new ObjectId(projectId) });
      } else {
        // Support lookup by slug if ID is not a valid ObjectId
        project = await db.collection("projects").findOne({ 
          $or: [
            { slug: projectId },
            { name: { $regex: new RegExp(`^${projectId.replace(/-/g, ' ')}$`, 'i') } }
          ]
        });
      }

      if (project) {
        return res.json({ 
          ...project, 
          id: project._id.toString(), 
          serviceId: project.serviceId?.toString(),
          imageUrl: project.imageUrl || project.image || project.image_url,
          galleryImages: project.galleryImages || project.images || project.gallery || []
        });
      }
    } catch (e) {
      console.error("MongoDB error", e);
    }
    const project = projects.find(p => p.id === req.params.projectId);
    if (!project) return res.status(404).send("Project not found");
    res.json(project);
  });

  app.post("/api/projects/delete-by-slug", async (req, res) => {
    try {
      const db = await getDb();
      const { slug } = req.body;
      
      // Delete any project with this slug or similar name
      const result = await db.collection("projects").deleteMany({ 
        $or: [
          { slug: slug },
          { name: { $regex: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') } }
        ]
      });
      
      console.log(`[API] Deleted ${result.deletedCount} projects matching slug: ${slug}`);
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  app.post("/api/projects/sync-images", async (req, res) => {
    try {
      const db = await getDb();
      const { slug, image, gallery } = req.body;
      
      // Upsert the project to ensure it exists with the correct images
      const result = await db.collection("projects").updateOne(
        { slug },
        { 
          $set: { 
            image, 
            gallery,
            // Ensure basic fields exist if it's a new insert
            name: req.body.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            serviceSlug: req.body.serviceSlug || "website-development",
            category: req.body.category || "website-development"
          } 
        },
        { upsert: true }
      );
      res.json({ success: true, result });
    } catch (error) {
      console.error("Sync error:", error);
      res.status(500).json({ error: "Failed to sync images" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

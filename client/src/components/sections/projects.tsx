import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Play, Github, Globe } from "lucide-react";

// Project Details Modal Component
function ProjectDetailsModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left: Images/Gallery */}
                <div className="space-y-6">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {project.gallery.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-100 aspect-video">
                          <img src={img} alt={`${project.title} gallery ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Info */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Project</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-full font-medium border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.features && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-6 flex flex-wrap gap-4">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Live Demo
                    </button>
                    <button className="px-8 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center">
                      <Github className="w-5 h-5 mr-2" />
                      View Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: "w-ramani",
      title: "Ramani Fashion",
      description: "A premium full-stack e-commerce ecosystem for authentic silk sarees, featuring a sophisticated customer experience and a robust admin management suite.",
      image: "/attached_assets/Screenshot_2026-01-05_at_12.10.42_PM_1767595244993.png",
      gallery: ["/attached_assets/Screenshot_2026-01-05_at_12.10.42_PM_1767595244993.png"],
      tags: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      features: ["Dynamic Product Catalog", "Inventory Management", "Secure Checkout", "Admin Dashboard"],
      serviceSlug: "website-development"
    },
    {
      id: "w-trainwithwinston",
      title: "Train With Winston",
      description: "High-performance digital ecosystem for 'Train with Winston' (House of Champions), designed for global online coaching.",
      image: "/attached_assets/Screenshot_2026-01-05_at_12.54.18_AM_1767554664658.png",
      gallery: ["/attached_assets/Screenshot_2026-01-05_at_12.54.18_AM_1767554664658.png"],
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      features: ["Custom Coaching Programs", "Progress Tracking", "Community Integration", "Booking System"],
      serviceSlug: "website-development"
    },
    {
      id: "w-malaydamania",
      title: "Malay Damania",
      description: "Professional personal branding and consulting platform for business growth consultant Malay Damania.",
      image: "/attached_assets/Screenshot_2026-01-05_at_1.15.52_AM_1767555957565.png",
      gallery: ["/attached_assets/Screenshot_2026-01-05_at_1.15.52_AM_1767555957565.png"],
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      features: ["Expert Consulting modules", "Content Management", "Lead Generation", "SEO Optimized"],
      serviceSlug: "website-development"
    },
    {
      id: "w-prism",
      title: "PRISM Post Production Management System",
      description: "PRISM - ERP for post-production houses to handle booking, resources, and project tracking.",
      image: "/attached_assets/Screenshot_2026-01-15_at_8.57.38_PM_1768490862776.png",
      gallery: ["/attached_assets/Screenshot_2026-01-15_at_8.57.38_PM_1768490862776.png"],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      features: ["Resource Scheduling", "Project Pipeline Tracking", "Financial Reporting", "Client Portal"],
      serviceSlug: "software-development"
    },
    {
      id: "w-pos",
      title: "POS Restaurant Billing Software",
      description: "A comprehensive Point of Sale system tailored for restaurants with billing and inventory management.",
      image: "/attached_assets/Screenshot_2026-01-15_at_8.57.38_PM_1768490862776.png",
      gallery: ["/attached_assets/Screenshot_2026-01-15_at_8.57.38_PM_1768490862776.png"],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      features: ["Quick Billing", "Inventory Alerts", "Kitchen Order Tickets", "Daily Sales Analytics"],
      serviceSlug: "software-development"
    },
    {
      id: "w-gym",
      title: "Online Training/Gym Management System",
      description: "A comprehensive multi-role dashboard for gym owners, trainers, and clients to manage workouts and memberships.",
      image: "/attached_assets/Screenshot_2026-01-02_at_4.06.02_PM_1767350165009.png",
      gallery: ["/attached_assets/Screenshot_2026-01-02_at_4.06.02_PM_1767350165009.png"],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      features: ["Membership Tracking", "Workout Planner", "Payment Integration", "Trainer Dashboard"],
      serviceSlug: "software-development"
    }
  ];

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-extralight text-gray-900 mb-8 tracking-tight leading-tight"
          >
            Our Services & Products
            <br />
            <span className="font-light bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              for Business Growth
            </span>
          </motion.h1>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              layout
            >
              <div 
                onClick={() => handleViewDetails(project)}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group h-full flex flex-col border border-gray-100"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <span className="px-6 py-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full font-semibold shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">View Details</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-full font-medium border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectDetailsModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}

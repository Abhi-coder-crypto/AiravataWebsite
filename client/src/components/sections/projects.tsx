import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Projects() {
  const projects = [
    {
      id: "w-ramani",
      title: "Ramani Fashion",
      description: "A premium full-stack e-commerce ecosystem for authentic silk sarees, featuring a sophisticated customer experience and a robust admin management suite.",
      image: "/attached_assets/Screenshot_2026-01-05_at_12.10.42_PM_1767595244993.png",
      tags: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "website-development"
    },
    {
      id: "w-trainwithwinston",
      title: "Train With Winston",
      description: "High-performance digital ecosystem for 'Train with Winston' (House of Champions), designed for global online coaching.",
      image: "/attached_assets/Screenshot_2026-01-05_at_12.54.18_AM_1767554664658.png",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      serviceSlug: "website-development"
    },
    {
      id: "w-malaydamania",
      title: "Malay Damania",
      description: "Professional personal branding and consulting platform for business growth consultant Malay Damania.",
      image: "/attached_assets/Screenshot_2026-01-05_at_1.15.52_AM_1767555957565.png",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      serviceSlug: "website-development"
    },
    {
      id: "w-prism",
      title: "PRISM Post Production Management System",
      description: "PRISM - ERP for post-production houses to handle booking, resources, and project tracking.",
      image: "/attached_assets/Screenshot_2026-01-15_at_8.57.38_PM_1768490862776.png",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "software-development"
    },
    {
      id: "w-pos",
      title: "POS Restaurant Billing Software",
      description: "A comprehensive Point of Sale system tailored for restaurants with billing and inventory management.",
      image: "/attached_assets/Screenshot_2026-01-15_at_8.57.38_PM_1768490862776.png",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "software-development"
    },
    {
      id: "w-gym",
      title: "Online Training/Gym Management System",
      description: "A comprehensive multi-role dashboard for gym owners, trainers, and clients to manage workouts and memberships.",
      image: "/attached_assets/Screenshot_2026-01-02_at_4.06.02_PM_1767350165009.png",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "software-development"
    }
  ];

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
              <Link href={`/projects/${project.serviceSlug}/${project.id}`}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
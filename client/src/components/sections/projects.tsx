import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Projects() {
  const projects = [
    {
      id: "ramani-fashion",
      title: "Ramani Fashion",
      description: "A premium full-stack e-commerce ecosystem for authentic silk sarees, featuring a sophisticated customer experience and a robust admin management suite.",
      image: "/attached_assets/Screenshot_2026-01-05_at_12.10.42_PM_1767595244993.png",
      tags: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "website-development"
    },
    {
      id: "train-with-winston",
      title: "Train With Winston",
      description: "High-performance digital ecosystem for 'Train with Winston' (House of Champions), designed for global online coaching.",
      image: "/attached_assets/Screenshot_2026-01-05_at_12.54.18_AM_1767554664658.png",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      serviceSlug: "website-development"
    },
    {
      id: "malay-damania",
      title: "Malay Damania",
      description: "Professional personal branding and consulting platform for business growth consultant Malay Damania.",
      image: "/attached_assets/Screenshot_2026-01-05_at_1.15.52_AM_1767555957565.png",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      serviceSlug: "website-development"
    },
    {
      id: "prism-post-production-management-system",
      title: "PRISM Post Production Management System",
      description: "PRISM - ERP for post-production houses to handle booking, resources, and project tracking.",
      image: "/attached_assets/Screenshot_2025-12-13_at_10.13.14_AM_1765600998382.png",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "software-development"
    },
    {
      id: "pos-restaurant-billing-software",
      title: "POS Restaurant Billing Software",
      description: "A comprehensive Point of Sale system tailored for restaurants with billing and inventory management.",
      image: "/attached_assets/Screenshot_2026-01-02_at_12.53.40_PM_1767338624773.png",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "software-development"
    },
    {
      id: "online-training-gym-management-system",
      title: "Online Training/Gym Management System",
      description: "A comprehensive multi-role dashboard for gym owners, trainers, and clients to manage workouts and memberships.",
      image: "/attached_assets/Screenshot_2026-01-02_at_4.06.02_PM_1767350165009.png",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      serviceSlug: "software-development"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#1a2b3c] mb-4"
          >
            Featured Projects
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-blue-600 mx-auto"
          />
        </motion.div>

        {/* Change to 2 column grid for md/lg screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/projects/${project.serviceSlug}/${project.id}`}>
                <div className="bg-white rounded-xl overflow-hidden cursor-pointer group flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-md">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-[#1a2b3c] mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 text-base leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 bg-[#f0f7ff] text-[#0066cc] text-sm rounded-full font-medium"
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
        </div>
      </div>
    </section>
  );
}

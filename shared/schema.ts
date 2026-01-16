import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const selectUserSchema = createSelectSchema(users);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;

// Explicit type definitions as fallback to avoid Drizzle type inference issues
export interface UserInterface {
  id: number;
  username: string;
  password: string;
}

export interface InsertUserInterface {
  username: string;
  password: string;
}

// Portfolio Types
export interface Service {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  slug: string;
}

export interface Project {
  id: string;
  serviceId: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  galleryImages: string[];
  clientName: string;
  clientIndustry: string;
  clientLocation: string;
  websiteUrl: string;
  duration: string;
  completedDate: string;
  technologies: string[];
  database?: string;
  isMobileFirst?: boolean;
  features: string[];
  outcomes: string[];
}

// Sample services data
export const services: Service[] = [
  {
    id: "3",
    title: "Software Development",
    tagline: "Custom Software",
    icon: "Code",
    slug: "software-development",
  },
  {
    id: "1",
    title: "Website Development",
    tagline: "Modern Web Solutions",
    icon: "Globe",
    slug: "website-development",
  },
  {
    id: "2",
    title: "Mobile Application Development",
    tagline: "iOS & Android Apps",
    icon: "Smartphone",
    slug: "mobile-application-development",
  },
  {
    id: "4",
    title: "Digital Marketing",
    tagline: "Growth Strategies",
    icon: "TrendingUp",
    slug: "digital-marketing",
  },
];

// Sample projects data (Truncated for brevity, but including essential structure)
export const projects: Project[] = [
  {
    id: "w-trainwithwinston",
    serviceId: "1",
    name: "Train With Winston",
    shortDescription: "High-performance digital ecosystem for 'Train with Winston'.",
    fullDescription: "A performance-driven coaching platform designed to convert visitors into trainees.",
    imageUrl: "/attached_assets/Screenshot_2026-01-05_at_12.54.18_AM_1767554664658.png",
    galleryImages: ["/attached_assets/Screenshot_2026-01-05_at_12.54.18_AM_1767554664658.png"],
    clientName: "Train with Winston",
    clientIndustry: "Fitness & Wellness",
    clientLocation: "Mumbai, India",
    websiteUrl: "https://trainwithwinston.com/",
    duration: "2 weeks",
    completedDate: "December 2025",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    features: ["Custom Training Programs"],
    outcomes: ["2,000+ Clients Transformed"],
  }
];

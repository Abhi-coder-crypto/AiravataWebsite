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
  },
  {
    id: "w-barrelborn-digital-menu",
    serviceId: "1",
    name: "Barrel Born Digital Menu",
    shortDescription: "A sophisticated digital menu platform for Barrel Born, enhancing guest engagement and operational efficiency.",
    fullDescription: "A high-performance digital menu ecosystem designed for Barrel Born. The platform offers an interactive and visually appealing menu experience, allowing guests to explore culinary offerings with ease. Integrated with modern web technologies, it ensures seamless updates and a premium digital presence for the brand.",
    imageUrl: "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_1767605011722.png",
    galleryImages: [
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_1767605011722.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(2)_1767605011723.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(3)_1767605011724.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(4)_1767605011724.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(5)_1767605011724.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(6)_1767605011725.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(7)_1767605011725.png"
    ],
    clientName: "Barrel Born",
    clientIndustry: "Hospitality / F&B",
    clientLocation: "Mumbai, India",
    websiteUrl: "https://barrelborn.com",
    duration: "2 weeks",
    completedDate: "October 2025",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Interactive Digital Menu: Categorized display of food and beverages with high-resolution imagery.",
      "Real-time Updates: Easy-to-use backend for instant menu modifications.",
      "Mobile-Optimized Interface: Seamless experience across all mobile devices for on-table browsing.",
      "QR Code Integration: Quick access for guests via table-top QR codes.",
      "Elegant Brand Storytelling: Dedicated sections for brand heritage and culinary philosophy."
    ],
    outcomes: [
      "Enhanced Guest Engagement: Significant increase in menu exploration and interaction.",
      "Operational Efficiency: Reduced dependency on physical menus and streamlined update process.",
      "Premium Digital Authority: Established a sophisticated online presence aligned with the brand's identity."
    ],
    isMobileFirst: true,
    database: "MongoDB",
  }
];

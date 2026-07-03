import { profileSchema } from "./schema";

export const profile = profileSchema.parse({
  name: "Nguyen Tran Trung Nguyen",
  role: "Mobile Engineer",
  location: "Ho Chi Minh City, Vietnam",
  bio: "I build optimized mobile applications with a focus on reliable engineering, thoughtful user experiences, and real business value.",
  email: "trungnguyenk4.it@gmail.com",
  githubUrl: null,
  linkedinUrl: "https://www.linkedin.com/in/trungnguyenmd",
  resumeUrl: "/nguyen-tran-trung-nguyen-cv.pdf",
  experience: [
    {
      company: "HILO Group",
      role: "Mobile Developer",
      start: "Oct 2025",
      end: null,
      summary:
        "Developing VietABank ezSHOP, including a reusable NFC SDK for mobile banking and Flutter module integration within a React Native environment.",
      url: null,
    },
    {
      company: "VNG Group",
      role: "Mobile Developer Intern",
      start: "Jan 2025",
      end: "Sep 2025",
      summary:
        "Contributed to MyVNG through UI/UX improvements, issue resolution, RESTful API integration, and Fastlane with GitLab CI/CD build automation.",
      url: null,
    },
  ],
  education: [
    {
      company: "FPT Polytechnic College",
      role: "Mobile Development",
      start: "GPA 8.5",
      end: "8.5",
      period: "GPA 8.5",
      summary: "Major in Mobile Development.",
      url: null,
    },
    {
      company: "React Native - The Practical Guide",
      role: "Professional certificate",
      start: "React Native",
      end: "Certificate",
      period: "React Native certificate",
      summary: "Practical React Native course certification.",
      url: null,
    },
  ],
  skills: [
    {
      label: "Languages",
      items: ["JavaScript", "TypeScript"],
    },
    {
      label: "Mobile",
      items: ["React Native", "Flutter", "Android", "iOS"],
    },
    {
      label: "State Management",
      items: ["Redux", "MobX-State-Tree", "Zustand"],
    },
    {
      label: "CI/CD & Release",
      items: ["GitLab CI/CD", "Fastlane"],
    },
    {
      label: "Tools",
      items: ["Git", "GitHub", "GitLab"],
    },
    {
      label: "Working style",
      items: ["Teamwork", "Self-learning", "Research", "Problem-solving"],
    },
  ],
});

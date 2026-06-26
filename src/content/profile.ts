import { profileSchema } from "./schema";

export const profile = profileSchema.parse({
  name: "Nguyen Tran Trung Nguyen",
  role: {
    en: "Mobile Engineer",
    vi: "Kỹ sư Mobile",
  },
  location: {
    en: "Ho Chi Minh City, Vietnam",
    vi: "TP. Hồ Chí Minh, Việt Nam",
  },
  bio: {
    en: "I build optimized mobile applications with a focus on reliable engineering, thoughtful user experiences, and real business value.",
    vi: "Tôi xây dựng ứng dụng mobile được tối ưu, chú trọng kỹ thuật đáng tin cậy, trải nghiệm người dùng chỉn chu và giá trị thực cho doanh nghiệp.",
  },
  email: "trungnguyenk4.it@gmail.com",
  githubUrl: null,
  linkedinUrl: "https://www.linkedin.com/in/trungnguyenmd",
  resumeUrl: "/nguyen-tran-trung-nguyen-cv.pdf",
  experience: [
    {
      company: { en: "HILO Group", vi: "HILO Group" },
      role: { en: "Mobile Developer", vi: "Mobile Developer" },
      start: "Oct 2025",
      end: null,
      summary: {
        en: "Developing VietABank ezSHOP, including a reusable NFC SDK for mobile banking and Flutter module integration within a React Native environment.",
        vi: "Phát triển VietABank ezSHOP, bao gồm NFC SDK tái sử dụng cho mobile banking và tích hợp module Flutter trong môi trường React Native.",
      },
      url: null,
    },
    {
      company: { en: "VNG Group", vi: "VNG Group" },
      role: { en: "Mobile Developer Intern", vi: "Thực tập sinh Mobile Developer" },
      start: "Jan 2025",
      end: "Sep 2025",
      summary: {
        en: "Contributed to MyVNG through UI/UX improvements, issue resolution, RESTful API integration, and Fastlane with GitLab CI/CD build automation.",
        vi: "Tham gia phát triển MyVNG qua việc cải thiện UI/UX, xử lý lỗi, tích hợp RESTful API và hỗ trợ tự động hóa build bằng Fastlane cùng GitLab CI/CD.",
      },
      url: null,
    },
  ],
  education: [
    {
      company: { en: "FPT Polytechnic College", vi: "Cao đẳng FPT Polytechnic" },
      role: { en: "Mobile Development", vi: "Lập trình Mobile" },
      start: "GPA 8.5",
      end: "8.5",
      period: { en: "GPA 8.5", vi: "GPA 8.5" },
      summary: {
        en: "Major in Mobile Development.",
        vi: "Chuyên ngành Lập trình Mobile.",
      },
      url: null,
    },
    {
      company: {
        en: "React Native — The Practical Guide",
        vi: "React Native — The Practical Guide",
      },
      role: { en: "Professional certificate", vi: "Chứng chỉ chuyên môn" },
      start: "React Native",
      end: "Certificate",
      period: { en: "React Native certificate", vi: "Chứng chỉ React Native" },
      summary: {
        en: "Practical React Native course certification.",
        vi: "Chứng nhận hoàn thành khóa học React Native thực hành.",
      },
      url: null,
    },
  ],
  skills: [
    {
      label: { en: "Languages", vi: "Ngôn ngữ" },
      items: ["JavaScript", "TypeScript"],
    },
    {
      label: { en: "Mobile", vi: "Mobile" },
      items: ["React Native", "Flutter", "Android", "iOS"],
    },
    {
      label: { en: "Delivery", vi: "Triển khai" },
      items: ["GitLab CI/CD", "Fastlane", "REST APIs", "Jest"],
    },
    {
      label: { en: "Tools & state", vi: "Công cụ & state" },
      items: ["Git", "GitHub", "GitLab", "MobX", "Redux"],
    },
    {
      label: { en: "Working style", vi: "Kỹ năng làm việc" },
      items: ["Teamwork", "Self-learning", "Research", "Problem-solving"],
    },
  ],
});

/**
 * ============================================================
 * SITE CONTENT — the single file to edit when updating copy.
 * Everything rendered on the page reads from here.
 * ============================================================
 */

export type SocialIcon = 'github' | 'linkedin' | 'leetcode' | 'mail'

export interface Social {
  label: string
  href: string
  icon: SocialIcon
}

export const site = {
  name: 'Shashank Singh',
  firstName: 'Shashank',
  lastName: 'Singh',
  title: 'Electronics & Communication Engineer · AI/ML & Full-Stack Developer',
  tagline: 'Bridging hardware and intelligence — from myoelectric arms to AI assistants.',
  location: 'Kanpur Nagar, Uttar Pradesh, India',
  locationShort: 'Kanpur · India',
  email: '2k22.ece.2213346@gmail.com',
  /** Served from /public — swap public/resume.pdf with the real file. */
  resumeUrl: '/resume.pdf',
  heroBio:
    "I'm Shashank Singh — a final-year Electronics & Communication Engineer who builds where hardware meets intelligence. From a myoelectric prosthetic arm to computer-vision smart glasses and an AI desktop assistant, I turn hard problems into real, working products. Python, C++, computer vision, and full-stack web are my toolkit; curiosity and a national hackathon track record are my fuel.",
  aboutBio: [
    "I'm Shashank Singh, a final-year B.Tech student in Electronics & Communication Engineering at PSIT Kanpur (CGPA 8.40), passionate about the space where hardware and software collide.",
    'I build end-to-end solutions across AI/ML, computer vision, embedded systems, and full-stack development — including a myoelectric prosthetic arm driven by sensor fusion, smart glasses that give the visually impaired real-time audio awareness, and an intelligent desktop AI assistant.',
    "A Smart India Hackathon 2024 qualifier and multi-competition winner, I bring a quality-focused, collaborative approach to every project. I'm now seeking a fresher IT role where I can apply my skills, keep learning fast, and build things that matter.",
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Shanky-13', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shashank-singh-79632a337/', icon: 'linkedin' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Shashank__13/', icon: 'leetcode' },
    { label: 'Email', href: 'mailto:2k22.ece.2213346@gmail.com', icon: 'mail' },
  ] satisfies Social[],
}

/* ------------------------------------------------------------ About stats */
export const stats = [
  { value: '8.40', label: 'CGPA — B.Tech ECE, PSIT Kanpur' },
  { value: 'SIH ’24', label: 'Smart India Hackathon — national qualifier' },
  { value: '03', label: 'Flagship builds — EMG, CV & AI' },
  { value: '2×', label: 'Competition wins — Byte & Build, Trivia Time' },
]

/* ------------------------------------------------------------ Skills */
export interface SkillGroup {
  title: string
  accent: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    accent: '#00e5ff',
    items: ['Python', 'C++', 'C', 'JavaScript', 'HTML5', 'CSS'],
  },
  {
    title: 'AI & Computer Vision',
    accent: '#7c3aed',
    items: ['Computer Vision', 'AI / ML', 'Sensor Fusion', 'Automation'],
  },
  {
    title: 'Tools & Platforms',
    accent: '#00e5ff',
    items: ['MATLAB', 'Git', 'RESTful APIs'],
  },
  {
    title: 'Data & CS Core',
    accent: '#7c3aed',
    items: ['SQL', 'Database Design', 'Data Structures', 'Algorithms', 'OOP'],
  },
]

/** Flat list for the marquee strip. */
export const allSkills = skillGroups.flatMap((g) => g.items)

/* ------------------------------------------------------------ Projects */
export type ProjectArt = 'assistant' | 'prosthetic' | 'glasses'

export interface Project {
  index: string
  title: string
  status: 'Ongoing' | 'Completed'
  description: string
  /** One-line impact / metric statement shown under the description. */
  impact: string
  tech: string[]
  art: ProjectArt
  /** TODO: point at the specific repo when it's public. */
  link: string
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Desktop AI Assistant',
    status: 'Ongoing',
    description:
      'An intelligent desktop assistant with voice recognition and NLP, wrapped in an attractive, user-friendly interface — plus automation features that take repetitive work off your plate.',
    impact: 'Voice-driven automation that shaves minutes off everyday desktop workflows.',
    tech: ['Python', 'AI / ML', 'NLP', 'Voice Recognition', 'GUI'],
    art: 'assistant',
    link: 'https://github.com/Shanky-13',
  },
  {
    index: '02',
    title: 'Myoelectric Prosthetic Arm',
    status: 'Completed',
    description:
      'An advanced prosthetic controlled by myoelectric signals, using sensor fusion for accurate gesture recognition and a real-time signal-processing pipeline for responsive movement.',
    impact: 'Raw EMG to motion in real time — sensor fusion for reliable gesture recognition.',
    tech: ['Embedded Systems', 'Sensor Fusion', 'Signal Processing', 'SOLIDWORKS'],
    art: 'prosthetic',
    link: 'https://github.com/Shanky-13',
  },
  {
    index: '03',
    title: 'Smart Glasses for the Visually Impaired',
    status: 'Completed',
    description:
      'Wearable assistive tech that pairs object detection with real-time audio feedback for environmental awareness — optimized for low power draw and all-day portability.',
    impact: 'Object detection to audio cue in real time — built low-power and pocket-portable.',
    tech: ['Computer Vision', 'Python', 'Sensor Fusion', 'Audio Feedback'],
    art: 'glasses',
    link: 'https://github.com/Shanky-13',
  },
]

/* ------------------------------------------------------------ Achievements */
export type BadgeIcon = 'trophy' | 'medal' | 'zap' | 'sparkles' | 'cpu'

export interface Achievement {
  title: string
  tag: string
  blurb: string
  icon: BadgeIcon
  featured?: boolean
}

export const achievements: Achievement[] = [
  {
    title: 'Smart India Hackathon 2024',
    tag: 'National Qualifier',
    blurb: 'Qualified at the national level of India’s biggest open innovation hackathon.',
    icon: 'trophy',
    featured: true,
  },
  {
    title: 'Byte and Build',
    tag: 'Winner',
    blurb: 'Took first place building under pressure against the clock.',
    icon: 'medal',
  },
  {
    title: 'Trivia Time',
    tag: 'Winner',
    blurb: 'Fastest brain in the room — technical quiz champion.',
    icon: 'zap',
  },
  {
    title: 'Glam and Tech Hackathon',
    tag: 'Participant',
    blurb: 'Shipped a working prototype in a cross-disciplinary sprint.',
    icon: 'sparkles',
  },
  {
    title: 'National-Level Competitions',
    tag: 'Circuit Design · Technical Quiz · Innovation Challenge',
    blurb: 'Competed nationally across hardware, theory and ideation tracks.',
    icon: 'cpu',
  },
]

export const certifications = {
  featured: {
    issuer: 'Salesforce Trailhead',
    name: 'Agentblazer Champion',
  },
  caption: 'HackerRank & Infosys Springboard',
  items: ['Python (Basic)', 'Problem Solving (Basic)', 'OOP using Python', 'HTML5'],
}

/* ------------------------------------------------------------ Education */
export const education = {
  degree: 'B.Tech — Electronics & Communication Engineering',
  institute: 'Pranveer Singh Institute of Technology (PSIT), Kanpur',
  period: 'Dec 2022 — Jul 2026',
  cgpa: 8.4,
  cgpaMax: 10,
}

/* ------------------------------------------------------------ Navigation */
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

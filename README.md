<div align="center">

# 🚀 Sawan Kumar — Portfolio

**Full Stack & AI Engineer**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-0ea5e9?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/thesawankumar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thesawankumar/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/thesawankumar)

</div>

---

## 📌 Overview

Personal portfolio website built with **React + Vite + Tailwind CSS** — showcasing my work as a Full Stack & AI Engineer. Features smooth animations, a responsive design, and sections covering my experience, projects, skills, and contact info.

---

## ✨ Features

| Section | Description |
|---|---|
| **Hero** | Animated intro with typewriter effect, floating stat chips, social links |
| **About** | Clean bio, focus areas (Full Stack, AI Engineering, Cloud), stats |
| **Skills** | 3-row auto-scrolling carousel — Frontend, Backend, AI/ML & DevOps |
| **Education** | B.Tech CSE & Higher Secondary with image cards |
| **Experience** | Left-aligned timeline with 3 internship entries |
| **Projects** | Featured card (ResumeRefine) + 3D tilt cards with slide-up hover overlay |
| **Contact** | EmailJS-powered contact form with toast notifications |

---

## 🛠️ Tech Stack

**Frontend**
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animations & 3D tilt
- [React Router DOM v6](https://reactrouter.com/)

**UI & Components**
- [Swiper.js](https://swiperjs.com/) — skills carousel
- [Vanta.js](https://www.vantajs.com/) — animated hero background
- [Lucide React](https://lucide.dev/) — icons
- [MUI Icons](https://mui.com/material-ui/material-icons/) — mobile nav icons
- [React Simple Typewriter](https://www.npmjs.com/package/react-simple-typewriter)

**Services**
- [EmailJS](https://www.emailjs.com/) — contact form
- [React Toastify](https://fkhadra.github.io/react-toastify/) — notifications

---

## 📂 Project Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── projects/        # Project screenshots
│       ├── skills/          # Skill icons (PNG + SVG)
│       ├── profile.png
│       └── Sawan-Kumar-Resume.pdf
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Desktop pill nav + mobile drawer
│   │   ├── MobileNavbar.jsx # Bottom tab bar (mobile)
│   │   ├── Hero.jsx         # Hero content with typewriter
│   │   ├── EmailForm.jsx    # Contact form with EmailJS
│   │   └── ScrollToAnchor.jsx
│   ├── constants/
│   │   ├── projectsData.js  # Projects config
│   │   └── skillsData.js    # Skills config (3 rows)
│   ├── sections/
│   │   ├── Home.jsx         # Vanta.js background + Hero
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   └── LandingPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/thesawankumar/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## ➕ Adding a New Project

Open `src/constants/projectsData.js` and add an entry:

```js
{
  id: 6,
  label: "Project Name",
  imgSrc: "/assets/projects/your-image.png",
  desc: "Short description of what it does.",
  tags: ["React", "Node.js", "MongoDB"],
  view: "https://your-live-link.com",
  github: "https://github.com/thesawankumar/repo",
  featured: false,   // set true to show as featured card
}
```

---

## 📬 Contact

| Channel | Link |
|---|---|
| Email | [sawankushwaha249@gmail.com](mailto:sawankushwaha249@gmail.com) |
| LinkedIn | [linkedin.com/in/thesawankumar](https://www.linkedin.com/in/thesawankumar/) |
| GitHub | [github.com/thesawankumar](https://github.com/thesawankumar) |
| LeetCode | [leetcode.com/thesawankumar](https://leetcode.com/thesawankumar) |

---

<div align="center">

Designed & built by **Sawan Kumar** &nbsp;·&nbsp; © 2025

</div>

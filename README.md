<div align="center">
  <h1>📸 Aura - Minimalist Photography Portfolio</h1>
  <p>A minimalist, high-performance portfolio template designed for professional photographers to showcase their creative work.</p>

  <!-- Badges -->
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</div>

<br />

## ✨ Overview

Aura provides an elegant, distraction-free environment where your photography takes center stage. Built with modern web technologies, it features smooth animations, infinite scrolling, and a cinematic lightbox experience that will leave an impression on your clients and viewers.

![Aura Portfolio Preview](https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop)
*(Drop a screenshot of your live portfolio here to make it look great on your GitHub repository!)*

## 🚀 Features

*   **Immersive Hero Section:** Animated parallax background with staggered typography and a subtle film-grain texture.
*   **Masonry Portfolio Grid:** Beautifully displays photos of varying aspect ratios (portrait, landscape, square) without cropping.
*   **Infinite Scrolling:** Seamlessly loads more images as the user scrolls down the page, enhancing the browsing experience.
*   **Cinematic Lightbox:** A premium, full-screen image viewer with blur transitions and scale effects.
*   **Interactive Ambient Background:** Fluid ambient light orbs that react to mouse movement and scroll position to create a dynamic depth effect.
*   **Category Filtering:** Easily filter portfolio items by categories like Portrait, Architecture, and Nature.
*   **Fully Responsive:** Flawless experience across mobile, tablet, and desktop devices.

## 🛠️ Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm, pnpm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aura-portfolio.git
   cd aura-portfolio
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application running.

## 📂 Project Structure

```text
.
├── src/
│   ├── components/         # Reusable UI components (e.g., BackgroundEffects)
│   ├── types.ts            # TypeScript interfaces
│   ├── App.tsx             # Main application component & layout
│   ├── index.css           # Tailwind CSS styles and custom UI bases
│   └── index.tsx           # React entry point
├── public/                 # Static assets
├── README.md               # You are here!
├── package.json            # Project metadata and dependencies
└── vite.config.ts          # Vite build configuration
```

## 🎨 Customization Guide

1. **Personalize the Photos:** Open `src/App.tsx` and update the `PORTFOLIO` array with your own high-resolution image URLs, titles, and categories.
2. **Update the Brand:** Change the "Alex Morgan" placeholder text in `src/App.tsx` and the `<title>` in `index.html` to your own name or studio title.
3. **Refine Categories:** Modify the `CATEGORIES` array in `src/App.tsx` to match your photography niches (e.g., *Wedding, Commercial, Street, Editorial*).
4. **Contact Info:** Scroll down to the Contact Section in `src/App.tsx` and update the `mailto:` link as well as your social media handles.

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! Feel free to check the issues page if you have any ideas on how to improve this template.

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed. Feel free to use it for your personal or commercial portfolio!

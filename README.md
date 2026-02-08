# Association Espoir 🌟

A modern, responsive charity/NGO website built with React, Vite, and Tailwind CSS. Association Espoir ("Hope Association") is dedicated to making a positive impact through transparent donations and community-driven projects.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-Private-red)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Admin Access](#admin-access)
- [Known Issues Fixed](#known-issues-fixed)
- [Folder Organization](#folder-organization)
- [Browser Support](#browser-support)
- [License](#license)

---

## ✨ Features

### Public Site Features
- **🏠 Home Page** - Hero section, featured projects, impact statistics, and call-to-action
- **📂 Projects Gallery** - Browse all charity projects with filtering and search
- **📖 Project Details** - Comprehensive project information with donation progress
- **💬 About Us** - Mission, vision, team, and organizational information
- **📞 Contact** - Contact form and organization contact information
- **📰 Impact Stories** - Success stories and testimonials from beneficiaries
- **👤 User Authentication** - Login and registration for donors
- **👤 User Profile** - Donor dashboard with donation history and personal settings

### Donation System Features
- **💳 Multi-step Donation Flow** - Seamless donation experience
- **💰 Payment Methods** - Support for multiple payment options
- **📱 Phone Verification** - Secure donor verification process
- **🧾 Receipt Upload** - Upload donation receipts for verification
- **✅ Donation Confirmation** - Thank you page with donation summary

### Admin Portal Features
- **📊 Executive Dashboard** - Analytics with charts and key metrics
- **📁 Projects Management** - Create, edit, and manage charity projects
- **💸 Donations Management** - View and verify all donations
- **👥 Donor Directory & CRM** - Manage donor relationships and history
- **⚙️ System Settings** - Configure site settings and preferences
- **🔐 Secure Login** - Protected admin access

### Technical Features
- **🌍 Multi-language Support** - Arabic, French, and English (i18n ready)
- **🌙 Dark Mode** - Full dark mode support throughout the application
- **📱 Responsive Design** - Mobile-first, works on all devices
- **⚡ Fast Performance** - Optimized with Vite for fast builds
- **♿ Accessibility** - WCAG compliant components

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | ^19.2.0 | UI Library |
| [Vite](https://vitejs.dev/) | ^7.2.4 | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4.0 | Utility-first CSS Framework |
| [React Router DOM](https://reactrouter.com/) | ^7.13.0 | Client-side Routing |
| [Recharts](https://recharts.org/) | ^3.7.0 | Data Visualization for Admin Charts |
| [Lucide React](https://lucide.dev/) | ^0.563.0 | Icon Library |

---

## 📁 Project Structure

```
association-espoir/
├── public/                     # Static assets
│   ├── logo.png               # Organization logo
│   └── vite.svg               # Vite logo
├── src/
│   ├── assets/                # Project assets (images, fonts)
│   │   └── react.svg
│   ├── components/            # Reusable UI components
│   │   ├── AdminLayout.jsx    # Admin portal layout
│   │   ├── Badge.jsx          # Status badge component
│   │   ├── Button.jsx         # Button component
│   │   ├── Card.jsx           # Card container component
│   │   ├── index.js           # Component exports
│   │   ├── Input.jsx          # Form input component
│   │   ├── MainLayout.jsx     # Public site layout
│   │   ├── MobileBottomNav.jsx # Mobile navigation
│   │   ├── ProgressBar.jsx    # Progress indicator
│   │   ├── Select.jsx         # Dropdown select component
│   │   └── ui/                # UI utility components
│   │       ├── index.js
│   │       ├── LoadingSpinner.jsx
│   │       └── Toast.jsx
│   ├── context/               # React Context
│   │   └── AppContext.jsx     # Global app state & theme
│   ├── pages/                 # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminDonations.jsx
│   │   ├── AdminDonorDetail.jsx
│   │   ├── AdminDonors.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminProjectDetail.jsx
│   │   ├── AdminProjectForm.jsx
│   │   ├── AdminProjects.jsx
│   │   ├── AdminSettings.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── DonationFlow.jsx
│   │   ├── Home.jsx
│   │   ├── ImpactStories.jsx
│   │   ├── Login.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── ProjectsList.jsx
│   │   ├── Register.jsx
│   │   └── UserProfile.jsx
│   ├── App.css                # App-specific styles
│   ├── App.jsx                # Root application component
│   ├── index.css              # Global styles & Tailwind
│   └── main.jsx               # Application entry point
├── .gitignore                 # Git ignore rules
├── .npmrc                     # NPM configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── netlify.toml               # Netlify deployment config
├── package.json               # Dependencies & scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── vercel.json                # Vercel deployment config
└── vite.config.js             # Vite configuration
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn**

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd association-espoir
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be generated in the `dist/` directory

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code linting |

---

## 🔐 Admin Access

### Accessing the Admin Portal

1. Navigate to `/admin/login` from the main site
2. Or click the admin link in the footer (if available)

### Demo Login Behavior

For demonstration purposes, **any authenticated user can access the admin panel**. This is configured to allow easy testing and demonstration of admin features without complex role-based access control.

**Default flow:**
1. Register a new account at `/register`
2. Login at `/login`
3. Navigate to `/admin/login` or access admin features directly

> **Note:** For production deployment, implement proper role-based authentication with admin privileges.

### Admin Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Executive dashboard with analytics |
| `/admin/projects` | Projects management |
| `/admin/projects/new` | Create new project |
| `/admin/projects/:id` | Edit existing project |
| `/admin/donations` | Donations management |
| `/admin/donors` | Donor directory |
| `/admin/donors/:id` | Donor detail view |
| `/admin/settings` | System settings |

---

## 🔧 Known Issues Fixed

### 1. Phone Number Input Cursor Position
**Issue:** Cursor jumping to the end when editing phone numbers in the middle of the input.

**Solution:** Implemented controlled input with cursor position preservation using `selectionStart` and `selectionEnd` properties.

### 2. React-Quill Compatibility
**Issue:** [React-Quill](https://github.com/zenoamaro/react-quill) incompatible with React 19, causing runtime errors and broken rich text editing.

**Solution:** Replaced React-Quill with native HTML `<textarea>` element for project descriptions and content editing. This ensures full compatibility with React 19 while maintaining functionality.

### 3. Admin Form Persistence
**Issue:** Losing form data when navigating away from admin forms (project creation/editing).

**Solution:** Implemented [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) persistence for form data. Data is automatically saved as users type and restored when returning to the form.

---

## 📂 Folder Organization

The project is organized into multiple directories for different purposes:

```
d:/verde.ai/
├── association-espoir/        # ⭐ PRODUCTION CODE
│   └── [Main project files]
│
├── front-end-ibtasim-v3/      # 🔧 DEVELOPMENT COPY
│   └── [Mirror of production for development/testing]
│
├── design website/             # 🎨 DESIGN MOCKUPS
│   ├── admin__donation_verification_modal/
│   ├── admin__donations_management_ledger/
│   ├── admin__donor_directory_&_crm/
│   ├── admin__executive_dashboard_1/
│   ├── admin__executive_dashboard_2/
│   ├── admin__project_editor_variant_2/
│   ├── admin__system_settings/
│   ├── admin_secure_login/
│   ├── charity_home_page_-_premium_moroccan_style/
│   ├── contact_our_team/
│   ├── donation_checkout_page/
│   ├── donation_success_&_thank_you/
│   ├── donor_login_&_verification/
│   ├── donor_registration_flow/
│   ├── impact_&_success_stories/
│   ├── project_detail_-_glassmorphic_sidebar/
│   └── projects_gallery_-_moroccan_charity/
│
├── screenshots/               # 📸 PROJECT SCREENSHOTS
│   └── [Various UI screenshots for documentation]
│
└── plans/                     # 📋 PROJECT PLANS
    └── IMPLEMENTATION_PLAN.md
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `association-espoir/` | **Production code** - The main deployable application |
| `front-end-ibtasim-v3/` | **Development workspace** - Mirror copy for active development |
| `design website/` | **Design mockups** - HTML/CSS prototypes and design references |
| `screenshots/` | **Documentation images** - Screenshots for README, testing, and documentation |
| `plans/` | **Planning documents** - Implementation plans and project specifications |

---

## 🌐 Browser Support

This application supports modern browsers with ES6+ support:

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |

### Features Required
- ES6+ JavaScript support
- CSS Grid and Flexbox
- CSS Custom Properties (Variables)
- Fetch API
- localStorage API

### Mobile Support
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 15+

---

## 📄 License

This project is **Private/Proprietary** software.

© 2024 Association Espoir. All rights reserved.

Unauthorized copying, distribution, modification, or use of this software is strictly prohibited without explicit written permission from the copyright holder.

---

## 🤝 Contributing

This is a private project. For inquiries about collaboration or contributions, please contact the project maintainers.

---

## 📞 Support

For technical support or questions about the application, please contact the development team.

---

<p align="center">
  <strong>Association Espoir</strong> - Bringing Hope to Communities
</p>

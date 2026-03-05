<div align="center">

# 🪡 Lakshmi Fashion & Designers

<img width="256" alt="Lakshmi Fashion Logo" src="https://github.com/user-attachments/assets/81d67fb2-2913-4fee-a980-2b54b9399f58" />

### Premium Women's Tailoring & Fancy Store Portal

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

## ✨ Overview

**Lakshmi Fashion & Designers** is a modern, high-performance web portal built for a premium tailoring and fancy store located in Vijayawada. The portal offers a seamless experience for customers to explore services, view product collections, and interact with the business across multiple languages (English & Telugu).

## 🚀 Key Features

- 🌐 **Multi-language Support**: Fully localized in English and Telugu (`i18n`).
- 👔 **Service Showcases**: Detailed catalog of tailoring services including Bridal Lehengas, Designer Blouses, and more.
- 🛍️ **Product Catalog**: Dynamic product listing with category filtering and real-time stock status.
- 🖼️ **Immersive Gallery**: High-performance image gallery featuring custom tailoring work.
- 🤖 **AI-Powered Collections**: Personalized product recommendations based on tailoring preferences.
- 🔐 **Admin Portal**: Comprehensive dashboard to manage products, gallery, and customer enquiries.
- 📧 **Enquiry Management**: Automated system to track and handle customer tailoring requests.
- 📱 **Mobile Responsive**: Fully optimized for desktop, tablet, and mobile with glassmorphic UI components.
- 💬 **Direct Integration**: Instant WhatsApp and Call integration for customer enquiries.
- 🎨 **Premium UI/UX**: Built with Framer Motion for smooth animations and Shadcn UI for a polished look.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Backend (API)**: Node.js, Express, Supabase (PostgreSQL)
- **ML Service**: Python, FastAPI, Scikit-learn, Pandas
- **Styling**: Tailwind CSS, Shadcn UI, Lucide Icons
- **Animations**: Framer Motion
- **Communication**: Resend (Email Notifications)
- **Type Safety**: Full TypeScript integration with full-stack consistency

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd lakshmi-tailor-portal
   ```

2. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend (Node.js)**

   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

4. **Setup ML Service (Python)**
   ```bash
   cd ../ml-service
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   python main.py
   ```

---

## 📐 Project Structure

```text
├── frontend/            # React + Vite Frontend
│   ├── src/             # Frontend source code
│   │   ├── components/  # AI & UI Layout components
│   │   ├── pages/       # Admin & Customer views
│   │   └── lib/         # API & Supabase clients
├── backend/             # Node.js + Express API
│   ├── src/             # Routing & Business Logic
│   │   ├── routes/      # Enquiries & Product APIs
│   │   └── utils/       # ML Integration & Mailer
├── ml-service/          # Python AI Microservice
│   ├── main.py          # FastAPI recommendation engine
│   └── requirements.txt # Python dependencies
└── README.md            # Root documentation
```

---

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the production bundle.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run format`: Formats code using Prettier.
- `npm run type-check`: Performs TypeScript static type checking.

---

## 👩‍💻 Developed By

**Vara4u Tech / Lakshmi Fashion Team**

_"Tailoring is not just about making clothes, it's about making people feel beautiful."_

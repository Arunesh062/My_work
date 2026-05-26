# My Work - Fitness Tracker 💪

A modern full-stack fitness web application designed for people looking to gain weight consistently through smart meal reminders, calorie tracking, weight tracking, and daily habit consistency.

## 🚀 Features

- **Modern Dark UI**: Premium design with glassmorphism and smooth animations.
- **Meal Reminders**: Browser notifications for scheduled meals.
- **Weight Tracker**: Log daily weight and visualize progress with charts.
- **Calorie Tracker**: Monitor daily intake and track remaining calories.
- **Water Tracker**: Animated hydration progress.
- **Streaks & Badges**: Gamified consistency tracking.
- **Analytics Dashboard**: Comprehensive view of your fitness journey.
- **PWA Support**: Installable on mobile and works offline.
- **BMI Calculator**: Real-time BMI and health category calculation.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS v4, Zustand, Recharts, React Router.
- **Backend**: Node.js, Express, JWT, CORS.
- **Database/Auth**: Firebase (with demo mode support).
- **Notifications**: Browser Notification API.

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend (Note: use `npm install` in both directories):
   ```bash
   npm install
   cd server && npm install
   ```

### Running the Application

To run both the frontend and backend concurrently:

```bash
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173)
The backend is deployed at: [https://my-work-up8e.onrender.com](https://my-work-up8e.onrender.com)

## 📁 Project Structure

```
My_work/
├── src/                # Frontend source
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages/routes
│   ├── store/          # Zustand state management
│   ├── utils/          # Helpers and utilities
│   ├── firebase/       # Firebase configuration
│   └── App.jsx         # Main application logic
├── server/             # Backend source
│   ├── routes/         # API routes
│   ├── middleware/     # Auth and other middleware
│   └── server.js       # Express entry point
├── public/             # Static assets (including sw.js)
├── index.html          # HTML entry point (with PWA meta)
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🔐 Demo Mode

The application includes a demo mode that allows you to explore all features without a Firebase account. Simply click "Try Demo Mode" on the login page.

## 📱 PWA & Mobile

The app is built with a responsive mobile-first design and is fully installable as a PWA (Progressive Web App). Use "Add to Home Screen" in your mobile browser to install it.

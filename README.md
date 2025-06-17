# FieldMate: Field Practicum Attendance Tracking System

<div align="center">

![FieldMate Logo](https://github.com/user-attachments/assets/b161406e-bc19-47dd-a846-1963b1fa5d7f)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Status](https://img.shields.io/badge/Status-In%20Development-blue.svg)](https://learn-vanguard.vercel.app/)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb.svg)](https://reactjs.org/)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646cff.svg)](https://vitejs.dev/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-green.svg)](https://mongodb.com/)

**🌐 Live Application:** [https://appoinment-system-5687f.web.app/](https://ispm-appdev-draft.web.app/)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Technologies Used](#️-technologies-used)
- [Setup Instructions](#-setup-instructions)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Frontend Structure](#-frontend-structure)
- [Development Guidelines](#-development-guidelines)
- [Deployment](#-deployment)
- [Dependencies](#-dependencies)
- [Troubleshooting](#-troubleshooting)
- [Project Team](#️-project-team)

---

## 📖 Project Overview

FieldMate is a comprehensive digital attendance tracking system designed specifically for La Verdad Christian College's Bachelor of Science in Information System (BSIS) students during their On-the-Job Training (OJT) or Field Practicum. The system addresses the challenges of monitoring attendance across diverse work arrangements including onsite, work-from-home, and hybrid setups.

### 🎯 Objectives

The system aims to:
- **Streamline Attendance Tracking**: Replace manual processes with a digital time-in/time-out system
- **Enhance Transparency**: Provide real-time visibility into attendance records for all stakeholders
- **Facilitate Communication**: Enable daily journal submissions for better coordination between students and supervisors
- **Provide Learning Resources**: Offer role-based educational materials tailored to specific internship responsibilities
- **Improve Efficiency**: Reduce administrative overhead and eliminate delays in attendance verification

### 🔍 Project Scope

- **Role-Specific Dashboards**: Intuitive interfaces for Students, Company Coordinators, and Administrators
- **Attendance Management**: Comprehensive time tracking with approval workflows
- **Journal System**: Daily activity logging and review capabilities
- **Resource Repository**: Organized learning materials by role (Project Manager, Creative Director, UI/UX Designer, SQA)
- **User Management**: Complete authentication and authorization system

---

## 🏗️ Architecture

FieldMate follows a modern full-stack architecture with clear separation of concerns:

### Frontend (React + Vite)
- **Framework**: React 19.1.0 with functional components and hooks
- **Build Tool**: Vite 6.2.0 for fast development and optimized builds
- **Styling**: Tailwind CSS 4.0.14 for utility-first styling
- **Routing**: React Router 7.3.0 for client-side navigation
- **State Management**: React hooks and context for local state
- **Authentication**: Firebase Auth integration

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express 5.1.0 framework
- **Database**: MongoDB with Mongoose 8.15.1 ODM
- **Authentication**: Firebase Admin SDK for token verification
- **Validation**: Joi 17.13.3 for request validation
- **Email Service**: Nodemailer 7.0.3 for OTP and notifications

### Database (MongoDB)
- **Primary Database**: MongoDB for application data
- **Additional**: Firebase Data Connect with PostgreSQL for extended features
- **Collections**: Users, Attendance, Journals, Companies, OTP

### Deployment
- **Frontend**: Firebase Hosting
- **Backend**: Render.com
- **Database**: MongoDB Atlas
- **CDN**: Firebase CDN for static assets

---

## ✨ Features

### 👨‍🎓 Student Features
- **Dashboard**: Personal overview with attendance summary and quick actions
- **Time Tracking**: Digital time-in/time-out with automatic hour calculation
- **Journal Submission**: Rich text editor for daily activity logging
- **Resource Access**: Role-based learning materials and documentation
- **Profile Management**: Personal information and company assignment

### 👨‍💼 Coordinator Features
- **Company Dashboard**: Overview of all assigned students
- **Attendance Review**: Approve/deny student attendance submissions
- **Journal Monitoring**: Review and track student daily activities
- **Student Management**: View student profiles and progress
- **Reporting**: Generate attendance and activity reports

### 👨‍💻 Admin Features
- **System Administration**: Complete user and system management
- **Company Management**: Add, edit, and manage partner companies
- **User Registration**: Approve and manage user accounts
- **System Analytics**: Overall system usage and performance metrics

### 🔐 Security Features
- **Firebase Authentication**: Secure login with email/password and Google OAuth
- **JWT Token Validation**: Server-side token verification for API security
- **Role-Based Access Control**: Granular permissions based on user roles
- **OTP Password Reset**: Secure password recovery via email
- **CORS Protection**: Configured cross-origin resource sharing

---

## 🛠️ Technologies Used

### Frontend Stack
![Frontend Technologies](https://skillicons.dev/icons?i=react,vite,tailwind,javascript,html,css&perline=6)

- **React 19.1.0**: Modern UI library with hooks and functional components
- **Vite 6.2.0**: Next-generation frontend build tool
- **Tailwind CSS 4.0.14**: Utility-first CSS framework
- **React Router 7.3.0**: Declarative routing for React
- **Axios 1.9.0**: Promise-based HTTP client
- **React Icons 5.5.0**: Popular icon library
- **TipTap**: Rich text editor for journal entries
- **Swiper 11.2.5**: Modern touch slider
- **Lucide React**: Beautiful & consistent icon toolkit

### Backend Stack
![Backend Technologies](https://skillicons.dev/icons?i=nodejs,express,mongodb,firebase&perline=4)

- **Node.js**: JavaScript runtime environment
- **Express 5.1.0**: Fast, unopinionated web framework
- **MongoDB**: NoSQL document database
- **Mongoose 8.15.1**: MongoDB object modeling
- **Firebase Admin 13.4.0**: Server-side Firebase integration
- **Joi 17.13.3**: Object schema validation
- **Nodemailer 7.0.3**: Email sending capability
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 16.5.0**: Environment variable management

### Development Tools
![Development Tools](https://skillicons.dev/icons?i=vscode,git,github,npm&perline=4)

- **VS Code**: Primary development environment
- **Git & GitHub**: Version control and collaboration
- **npm**: Package management
- **ESLint**: Code linting and formatting
- **Nodemon**: Development server auto-restart

### Deployment & Hosting
![Deployment](https://skillicons.dev/icons?i=firebase,vercel&perline=2)

- **Firebase Hosting**: Initial Frontend deployment
- **Render.com**: Backend API hosting
- **MongoDB Atlas**: Cloud database hosting
- **Vercel**: Main Frontend hosting option

---

## 🎨 Frontend Structure

### 📁 Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── header.jsx      # Main header component
│   ├── sidebar.jsx     # Navigation sidebar
│   ├── footer.jsx      # Footer component
│   ├── ProtectedRoute.jsx  # Route protection
│   ├── UserProfileModal.jsx # User profile modal
│   ├── Calendar.jsx    # Calendar component
│   ├── Skeleton.jsx    # Loading skeleton
│   └── ...
├── Pages/              # Page components
│   ├── Student/        # Student-specific pages
│   │   ├── StudentDashboard.jsx
│   │   ├── Attendance.jsx
│   │   ├── Journal.jsx
│   │   ├── Resources.jsx
│   │   └── ...
│   ├── Coordinator/    # Coordinator-specific pages
│   │   ├── CompanyDashboard.jsx
│   │   ├── CompanyAttendance.jsx
│   │   └── ...
│   ├── Admin/          # Admin-specific pages
│   │   ├── AdminDashboard.jsx
│   │   └── CompanyList.jsx
│   ├── SignIn.jsx      # Authentication pages
│   ├── SignUp.jsx
│   └── ...
├── services/           # API and utility services
│   ├── authService.js  # Authentication logic
│   ├── secureAxios.js  # Axios interceptor for auth
│   ├── userInfo.js     # User information service
│   └── ...
├── firebase/           # Firebase configuration
│   └── firebase.js
├── assets/             # Static assets
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

### 🔄 Key Components

#### Protected Routes
- **ProtectedRoute.jsx**: Handles role-based access control
- **TrackRoleVisit.jsx**: Tracks user navigation for recently accessed roles

#### Authentication
- **SignIn.jsx**: Login with email/password and Google OAuth
- **SignUp.jsx**: User registration with role assignment
- **ForgotPassword.jsx**: Password reset with OTP verification

#### Dashboards
- **StudentDashboard.jsx**: Student overview with attendance summary
- **CompanyDashboard.jsx**: Coordinator view of assigned students
- **AdminDashboard.jsx**: System administration interface

#### Core Features
- **Attendance.jsx**: Time tracking interface for students
- **Journal.jsx**: Rich text editor for daily entries
- **Resources.jsx**: Role-based learning materials

---

## �🛠️ Project Team

<div align="center">

## 📊 Project Management

<table align="center">
  <tr>
    <td align="center" width="400">
      <img src="https://img.shields.io/badge/Role-Project%20Manager-blue?style=for-the-badge&logo=jira&logoColor=white"/>
      <br>
      <img src="/public/members/pagarigan.png" width="100" height="100" style="border-radius: 50%"/>
      <br>
      <b>Shaina Karillyn Pagarigan</b>
      <br>
      <br>
      <br>
      <a href="https://github.com/shaina31">
        <img src="https://img.shields.io/badge/GitHub-shaina31-black?style=flat-square&logo=github"/>
      </a>
    </td>
    <td align="center" width="400">
      <img src="https://img.shields.io/badge/Role-Project%20Manager-blue?style=for-the-badge&logo=jira&logoColor=white"/>
      <br>
      <img src="/public/members/santos.png" width="100" height="100" style="border-radius: 50%"/>
      <br>
      <b>Aerrol Kyle Santos</b>
      <br>
      <br>
      <br>
      <a href="https://github.com/Aerrol-Kyle">
        <img src="https://img.shields.io/badge/GitHub-Aerrol-black?style=flat-square&logo=github"/>
      </a>
    </td>
  </tr>
</table>

## 🚀 Development Team

<table align="center">
  <tr>
    <td align="center" width="400">
      <img src="https://img.shields.io/badge/Role-Lead%20Developer-black?style=for-the-badge&logo=javascript&logoColor=white"/>
      <br>
      <img src="/public/members/isip.png" width="100" height="100" style="border-radius: 50%"/>
      <br>
      <b>Christian Eliseo Isip</b>
      <br>
      <br>
      <br>
      <a href="https://github.com/ChristianEliseoNavales">
        <img src="https://img.shields.io/badge/GitHub-ChristianEliseoNavales-black?style=flat-square&logo=github"/>
      </a>
    </td>
    <td align="center" width="400">
      <img src="https://img.shields.io/badge/Role-Lead%20Developer-black?style=for-the-badge&logo=javascript&logoColor=white"/>
      <br>
      <img src="/public/members/dicdican.png" width="100" height="100" style="border-radius: 50%"/>
      <br>
      <b>Roylyn Dicdican</b>
      <br>
      <br>
      <br>
      <a href="https://github.com/roylynjoy">
        <img src="https://img.shields.io/badge/GitHub-roylynjoy-black?style=flat-square&logo=github"/>
      </a>
    </td>
  </tr>
</table>

## 🎨 Design

<table align="center">
  <tr>
    <td align="center" width="400">
      <img src="https://img.shields.io/badge/Role-UI%2FUX%20Designer-purple?style=for-the-badge&logo=figma&logoColor=white"/>
      <br>
      <img src="/public/members/asaldo.png" width="100" height="100" style="border-radius: 50%"/>
      <br>
      <b>Rizalyne Asaldo</b>
      <br>
      <br>
      <br>
      <a href="https://github.com/rizalyneasaldo1">
        <img src="https://img.shields.io/badge/GitHub-rizalyneasaldo1-black?style=flat-square&logo=github"/>
      </a>
    </td>
    <td align="center" width="400">
      <img src="https://img.shields.io/badge/Role-UI%2FUX%20Designer-purple?style=for-the-badge&logo=figma&logoColor=white"/>
      <br>
      <img src="/public/members/reyes.png" width="100" height="100" style="border-radius: 50%"/>
      <br>
      <b>Lorenz Genesis Reyes</b>
      <br>
      <br>
      <br>
      <a href="https://github.com/O127Lorenz">
        <img src="https://img.shields.io/badge/GitHub-O127Lorenz-black?style=flat-square&logo=github"/>
      </a>
    </td>
  </tr>
</table>

## 🔍 Quality Assurance

<table align="center">
  <tr>
    <td align="center" width="400">
      <img src="https://img.shields.io/badge/Role-SQA-red?style=for-the-badge&logo=testcafe&logoColor=white"/>
      <br>
      <img src="/public/members/magpayo.png" width="100" height="100" style="border-radius: 50%"/>
      <br>
      <b>Kristel Magpayo</b>
      <br>
      <br>
      <br>
      <a href="https://github.com/TelTrekker">
        <img src="https://img.shields.io/badge/GitHub-TelTrekker-black?style=flat-square&logo=github"/>
      </a>
    </td>
  </tr>
</table>

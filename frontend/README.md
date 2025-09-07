# 🎓 CampusOS - Comprehensive Campus Management System

<div align="center">
  <img src="./src/assets/erp-logo.png" alt="CampusOS Logo" width="100" height="100">
  <h3>Your comprehensive campus management solution</h3>
  <p>Streamlining education, administration, and campus life in one powerful platform</p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

CampusOS is a modern, comprehensive campus management system built with React and Vite. It provides a unified platform for students, faculty, management, and administrators to manage various aspects of campus life including academics, attendance, fees, hostel management, and more.

### ✨ Key Highlights

- **Role-based Access Control** - Separate dashboards for Students, Faculty, Management, and Admin
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **Real-time Updates** - Live notifications and data synchronization
- **Secure Authentication** - Protected routes and user session management

---

## 🚀 Features

### 👨‍🎓 For Students
- **Academic Management**
  - View attendance records and statistics
  - Access grades and CGPA/SGPA calculations
  - Course registration and scheduling
  - Assignment submissions and deadlines

- **Campus Services**
  - Fee payment tracking and history
  - Hostel room management
  - Canteen meal plans and menus
  - Library book management

- **Communication**
  - Real-time notifications
  - Faculty contact information
  - Academic calendar and events

### 👨‍🏫 For Faculty
- **Teaching Management**
  - Student attendance tracking
  - Grade entry and management
  - Course material uploads
  - Class scheduling

- **Academic Oversight**
  - Student performance analytics
  - Assignment and exam management
  - Parent-teacher communication
  - Research and publication tracking

### 🏢 For Management
- **Administrative Control**
  - Fee collection monitoring
  - Campus facility management
  - Staff oversight
  - Financial reporting

- **Strategic Planning**
  - Performance analytics
  - Resource allocation
  - Policy implementation
  - Compliance tracking

### ⚙️ For Admin
- **System Administration**
  - User management (Students, Faculty, Staff)
  - Role and permission management
  - System configuration
  - Data backup and recovery

- **Analytics & Reporting**
  - Comprehensive dashboards
  - Custom report generation
  - Performance metrics
  - System monitoring

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite 7.1.2** - Lightning-fast build tool
- **React Router DOM 7.8.2** - Client-side routing
- **Tailwind CSS 4.0.0** - Utility-first CSS framework

### Form Management
- **React Hook Form 7.62.0** - Performant forms with easy validation

### HTTP Client
- **Axios 1.11.0** - Promise-based HTTP client

### UI Components
- **Material-UI 7.3.2** - React component library
- **Emotion** - CSS-in-JS library

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/divya4234/CampusOS.git
   cd CampusOS/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/            # Images, icons, and static files
│   │   ├── erp-logo.png
│   │   ├── collegeCovers.png
│   │   └── studentImg.png
│   ├── components/        # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── Loading/
│   │       └── loading.jsx
│   ├── context/           # React Context for state management
│   │   ├── AuthContext.jsx
│   │   └── AuthContextBase.js
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── pages/             # Page components
│   │   ├── Academic/      # Academic-related pages
│   │   ├── Auth/          # Authentication pages
│   │   ├── Dashboard/     # Role-based dashboards
│   │   ├── Profile/       # User profiles
│   │   ├── Landing/       # Landing page
│   │   └── Error/         # Error pages
│   ├── routes/            # Routing configuration
│   │   ├── AppRouter.jsx
│   │   └── RoleBasedRoute.jsx
│   ├── services/          # API services
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   └── mockAuthService.js
│   ├── utils/             # Utility functions
│   │   └── index.js
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── eslint.config.js       # ESLint configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

---

## 👥 User Roles

### 🎓 Student Login
- **Username**: Any student ID (e.g., `STU001`, `student123`)
- **Password**: Minimum 6 characters
- **Role**: Select "Student" from dropdown

### 👨‍🏫 Faculty Login
- **Username**: Faculty ID (e.g., `FAC001`, `faculty123`)
- **Password**: Minimum 6 characters
- **Role**: Select "Faculty" from dropdown

### 🏢 Management Login
- **Username**: Management ID (e.g., `MGT001`, `management123`)
- **Password**: Minimum 6 characters
- **Role**: Select "Management" from dropdown

### ⚙️ Admin Login
- **Quick Admin Access**: Click "Login as Admin" button
- **Credentials**: `admin001` / `admin123`

---

## 🎨 Design System

### Color Palette
- **Primary**: `#6366F1` (Indigo)
- **Secondary**: `#14B8A6` (Teal)
- **Accent**: `#FACC15` (Yellow)
- **Success**: `#22C55E` (Green)
- **Danger**: `#EF4444` (Red)
- **Background**: `#0F172A` (Dark Slate)

### Typography
- **Headings**: Montserrat (600 weight)
- **Secondary Headings**: Playfair Display (400 weight)
- **Body Text**: Roboto (400 weight)

---

## 🔌 API Integration

### Authentication Endpoints
```javascript
POST /api/auth/login      // User authentication
POST /api/auth/logout     // User logout
GET  /api/auth/profile    // Get user profile
PUT  /api/auth/profile    // Update user profile
```

### Academic Endpoints
```javascript
GET  /api/attendance      // Get attendance records
POST /api/attendance      // Mark attendance
GET  /api/grades         // Get grade records
POST /api/grades         // Submit grades
```

### Fee Management
```javascript
GET  /api/fees           // Get fee details
POST /api/fees/payment   // Process fee payment
GET  /api/fees/history   // Payment history
```

---

## 🤝 Contributing

We welcome contributions to CampusOS! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support and queries:
- **Email**: info@campusos.com
- **Phone**: +1 (555) 123-4567
- **Documentation**: [Wiki](https://github.com/divya4234/CampusOS/wiki)
- **Issues**: [GitHub Issues](https://github.com/divya4234/CampusOS/issues)

---

## 🎯 Future Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced analytics and reporting
- [ ] Integration with external learning management systems
- [ ] AI-powered student performance predictions
- [ ] Multi-language support
- [ ] Enhanced security features
- [ ] Real-time chat system
- [ ] Video conferencing integration

---

<div align="center">
  <p>Made with ❤️ by the CampusOS Team</p>
  <p>© 2025 CampusOS. All rights reserved.</p>
</div>

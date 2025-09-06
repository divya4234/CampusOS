# Frontend Structure Documentation

## Directory Structure

```
frontend/
│── public/                     # Static files (favicon, index.html, logo, etc.)
│
│── src/
│   │── assets/                 # Images, icons, fonts, Lottie animations
│   │   └── erp-logo.png       # Example logo file
│   │
│   │── components/             # Reusable UI components
│   │   ├── common/             # Buttons, Inputs, Modals, Loaders, etc.
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── index.js       # Barrel exports
│   │   ├── layout/             # Navbar, Sidebar, Footer, Header, etc.
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── dashboard/          # Cards, Widgets, Charts for ERP dashboard
│   │       └── DashboardCard.jsx
│   │
│   │── features/               # Feature-based architecture
│   │   ├── auth/               # Login, Signup, Forgot Password
│   │   ├── faculty/            # Faculty-specific components & pages
│   │   ├── student/            # Student-specific components & pages
│   │   ├── management/         # Admin/Management dashboard & tools
│   │   └── notifications/      # Announcements, Alerts, Messages
│   │
│   │── pages/                  # Page-level components for routes
│   │   ├── Landing/            # Homepage, About, Contact
│   │   │   └── HomePage.jsx
│   │   ├── Dashboard/          # Role-based dashboards
│   │   ├── Profile/            # User profiles (student/faculty/admin)
│   │   └── Error/              # 404, 500, Access Denied
│   │       ├── NotFoundPage.jsx
│   │       └── UnauthorizedPage.jsx
│   │
│   │── context/                # React Context (AuthContext, ThemeContext, RoleContext)
│   │   └── AuthContext.jsx
│   │
│   │── hooks/                  # Custom hooks (useAuth, useFetch, useDarkMode)
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   │── services/               # API calls & backend integration
│   │   ├── apiClient.js        # Axios/Fetch config
│   │   └── authService.js      # Auth-related APIs
│   │
│   │── routes/                 # Routing configuration
│   │   ├── PrivateRoute.jsx    # Auth-protected routes
│   │   ├── RoleBasedRoute.jsx  # Role-protected routes (student/faculty/admin)
│   │   └── AppRouter.jsx       # Central router config
│   │
│   │── store/                  # State management (if using Redux / Zustand / Recoil)
│   │
│   │── styles/                 # Tailwind + MUI theme overrides
│   │   └── globals.css         # Global styles with Tailwind
│   │
│   │── utils/                  # Utility functions/helpers (formatDate, validators, constants)
│   │   └── index.js           # Common utilities
│   │
│   │── App.jsx                 # Root component
│   │── main.jsx                # Entry point (ReactDOM.createRoot)
│   └── index.css               # Tailwind base styles
│
│── package.json
│── tailwind.config.js
│── postcss.config.js
└── vite.config.js
```

## Key Features Implemented

### 1. Component Architecture
- **Common Components**: Reusable UI components (Button, Input, Modal, Loader)
- **Layout Components**: Navbar, Footer for consistent layout
- **Dashboard Components**: Cards and widgets for dashboard displays

### 2. Routing System
- **AppRouter**: Central routing configuration
- **PrivateRoute**: Authentication-protected routes
- **RoleBasedRoute**: Role-based access control (admin, faculty, student)

### 3. Authentication System
- **AuthContext**: React Context for authentication state
- **AuthService**: API service for authentication operations
- **Token Management**: Automatic token handling with localStorage

### 4. API Integration
- **apiClient**: Configured Axios instance with interceptors
- **Service Layer**: Organized API calls by feature

### 5. Custom Hooks
- **useAuth**: Authentication state management
- **useFetch**: Generic data fetching hook

### 6. Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Global Styles**: Custom utilities and base styles
- **Responsive Design**: Mobile-first approach

### 7. Error Handling
- **404 Page**: Not found error page
- **403 Page**: Unauthorized access page
- **API Error Handling**: Centralized error handling in API client

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npm install react-router-dom
   ```

2. Initialize Tailwind CSS:
   ```bash
   npx tailwindcss init -p
   ```

3. Update your `tailwind.config.js`:
   ```javascript
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## File Naming Conventions

- **Components**: PascalCase with `.jsx` extension (e.g., `Button.jsx`)
- **Pages**: PascalCase with `Page` suffix (e.g., `HomePage.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.js`)
- **Services**: camelCase with `Service` suffix (e.g., `authService.js`)
- **Utils**: camelCase (e.g., `index.js`)

## Best Practices

1. **Component Organization**: Group related components in feature folders
2. **Barrel Exports**: Use index.js files for clean imports
3. **Error Boundaries**: Implement error boundaries for robust error handling
4. **Code Splitting**: Use React.lazy() for route-based code splitting
5. **TypeScript**: Consider migrating to TypeScript for better type safety

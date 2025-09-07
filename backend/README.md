# CampusOS Backend

CampusOS is a multi-tenant College ERP System that helps educational institutions manage their administrative tasks, student records, and faculty information. This repository contains the backend API built with Node.js, Express, and MongoDB.

## 🌟 Features

- Multi-tenant architecture (Multiple colleges can use the same system)
- Role-based access control (Admin, Teacher, Student)
- JWT-based authentication
- Secure password handling
- Department-wise organization
- Comprehensive API documentation

## 🏗 Architecture

### Multi-Tenant Design

- Each college has its own space (tenant)
- Data isolation using `collegeId`
- Middleware ensures data security between tenants

### Role-Based Access

- **Admin**: Full system access
- **Teacher**: Access to student data and department information
- **Student**: Access to their own data and public information

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/campusos
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run database seeder (if needed)
npm run seed
```

## 📚 API Documentation

### Base URL

```
http://localhost:4000/api
```

### Authentication

All authenticated routes require:

- Bearer token in Authorization header
- X-College-Id header for tenant identification

### 1. College Management

#### Register New College

```http
POST /colleges/register
Content-Type: application/json

{
    "name": "College Name",
    "code": "CLG01",
    "adminName": "Admin Name",
    "adminEmail": "admin@college.com",
    "adminPassword": "secure_password"
}
```

### 2. Authentication

#### Login

```http
POST /auth/login
X-College-Id: <college_id>
Content-Type: application/json

{
    "email": "user@college.com",
    "password": "password123"
}
```

### 3. Teacher Management

#### List All Teachers

```http
GET /teachers
Authorization: Bearer <token>
X-College-Id: <college_id>
```

#### Create Teacher

```http
POST /teachers
Authorization: Bearer <token>
X-College-Id: <college_id>
Content-Type: application/json

{
    "name": "Teacher Name",
    "email": "teacher@college.com",
    "department": "Computer Science",
    "password": "teacher123"
}
```

#### Get Teachers by Department

```http
GET /teachers/department?department=Computer Science
Authorization: Bearer <token>
X-College-Id: <college_id>
```

### 4. Student Management

#### List All Students

```http
GET /students
Authorization: Bearer <token>
X-College-Id: <college_id>
```

#### Create Student

```http
POST /students
Authorization: Bearer <token>
X-College-Id: <college_id>
Content-Type: application/json

{
    "name": "Student Name",
    "email": "student@college.com",
    "department": "Computer Science",
    "year": 1,
    "password": "student123"
}
```

#### Get Students by Department/Year

```http
GET /students/department?department=Computer Science
GET /students/year?year=1
Authorization: Bearer <token>
X-College-Id: <college_id>
```

## 🔒 Security Features

1. **Password Security**

   - Passwords are hashed using bcrypt
   - Passwords are never stored in plain text

2. **JWT Authentication**

   - Tokens expire after 24 hours (configurable)
   - Refresh token mechanism available

3. **Data Isolation**
   - Tenant middleware ensures data separation
   - Each college can only access its own data

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── config/          # Configuration files
│   ├── index.js         # Entry point
│   └── server.js        # Express app setup
├── tests/               # Test files
└── package.json
```

## 🔍 Models

### College

- name: String
- code: String (unique)
- status: String (active/inactive)

### Admin

- name: String
- email: String
- passwordHash: String
- collegeId: ObjectId

### Teacher

- name: String
- email: String
- department: String
- passwordHash: String
- status: String
- collegeId: ObjectId

### Student

- name: String
- email: String
- department: String
- year: Number
- passwordHash: String
- status: String
- collegeId: ObjectId

## 🛠 Development

### Adding New Features

1. Create route in `routes/`
2. Add controller in `controllers/`
3. Implement business logic in `services/`
4. Add model if needed in `models/`

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Error Handling

The application uses a centralized error handling mechanism. All errors are processed through the error middleware.

## 📝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🤝 Support

For support, email your-email@college.com or raise an issue in the repository.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

<p align="center">
  <img src="https://raw.githubusercontent.com/imrannaazir/jobsbd-web/refs/heads/emon/src/assets/main/logo-transparent.png" alt="jobsBD" height="150dp">
</p>

<p align=center>
<a href="https://jobsbd-api.vercel.app/">API URL</a> ·
  <a href="https://jobsbd.vercel.app/">Website</a> ·
  <a href="https://github.com/imrannaazir/jobsbd-web">Frontend repository</a> ·
  <a href="https://github.com/imrannaazir/jobsbd-api">Backend repository</a>
</p>

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
  - [General Features](#general-features)
  - [Admin Features](#admin-features)
  - [Recruiter Features](#recruiter-features)
- [Tech Stack](#️tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [License](#license)

## 🛠️ About JobsBD

Welcome to the **JobsBD** project! This repository contains the server-side code for our jobsbd application. This README file provides guidelines on how to build and contribute to the project as a team. Please make sure to follow these instructions to maintain a consistent and efficient development process.

## 🚀 Features

### 🌟 General Features:

- **Responsive Design**: Fully optimized for API responses.
- **Modern Architecture**: Follows best practices with a modular and scalable structure.
- **High Performance**: Optimized for quick responses and large-scale data handling.

### 👤 Admin Features:

- **User Management**: Add, edit, delete, and manage users.
- **Job Post Management**: Oversee and moderate all job postings.
- **Dashboard Overview**: Real-time insights and activity summaries.

### 💼 Recruiter Features:

- **Job Management**: Create, update, and delete job postings.
- **Application Tracking**: View and manage applications for job postings.
- **Profile Management**: Edit and update recruiter profiles.

### 👤 Candidate Features:

- **Job Application**: Submit applications directly for job postings.
- **Application History**: Access a detailed record of past applications with their statuses.
- **Search and Filter Jobs**: Leverage advanced filters and search functionality by category, location, and criteria.
- **Profile Management**: Update resumes, contact details, and manage personal profile data securely.

---
## 🛠️ Tech Stack

### 🌐 Backend
**Framework**: Express.js  
**Database**: Prisma ORM with PostgreSQL  
**Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing  
**Email Service**: Nodemailer  
**Validation**: Zod Schema Validation  
**Cookies**: Cookie-parser for parsing HTTP cookies  

### ⚙️ Development & Utilities
**Language & Type Safety**: TypeScript  
**Development Tools**: ts-node, ts-node-dev for live reloading  
**Environment Configuration**: dotenv for secure environment variable management  
**HTTP Status Management**: http-status for standardized response codes  

### 🔧 Linting & Code Quality
**Code Linting**: ESLint for detecting code issues  
**Code Formatting**: Prettier for consistent formatting  
**Pre-commit Tools**: Husky and lint-staged for enforcing quality checks  

### 🧰 Tools
**Package Management**: NPM  
**Testing**: Jest (if applicable)  
**Utilities**: clsx, and other essential libraries for building robust applications  

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [Yarn](https://yarnpkg.com/)
- A running PostgreSQL database instance

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/imrannaazir/jobsbd-api.git
   cd jobsbd-api
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the necessary variables:

   ```env
   NODE_ENV="development"
   PORT=5000
   DATABASE_URL=your_database_url
   SALT_ROUND=10
   CLIENT_ORIGIN="http://localhost:3000"
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_SECRET=your_jwt_Refresh_secret
   JWT_ACCESS_EXPIRE_IN="30d"
   JWT_REFRESH_EXPIRE_IN="365d"
   RESET_PASSWORD_TOKEN=your_reset_password_token
   RESET_PASSWORD_TOKEN_EXPIRE_IN="5m"
   VERIFY_TOKEN=your_verify_token
   VERIFY_TOKEN_EXPIRE_IN="1d"
   EMAIL=your_email
   APP_PASSWORD=your_app_password
   SUPER_ADMIN_EMAIL=your_super_admin_email
   SUPER_ADMIN_PASSWORD=your_super_admin_password
   SUPER_ADMIN_PHONE_NUMBER=your_super_admin_phone_number
   ```

```

```

4. **Run Migrations**

```bash
yarn prisma:migrate
```

5. **Start the Development Server**
   ```bash
   yarn dev
   ```

## 🗂️ Project Structure

```
JobsBD-API/
├── node_modules/         # Dependencies installed by npm/yarn
├── prisma/               # Prisma configuration for ORM and database management
├── src/                  # Source code directory
│   ├── app/              # Main application logic
│   │   ├── db/           # Database-related configurations
│   │   ├── middlewares/  # Middleware functions for request handling
│   │   ├── modules/      # Feature-specific modules
│   │   │   ├── auth/         # Authentication module
│   │   │   ├── candidate/    # Candidate-specific logic
│   │   │   ├── company/      # Company-specific logic
│   │   │   ├── department/   # Department management
│   │   │   ├── education/    # Education management
│   │   │   ├── experience/   # Experience management
│   │   │   ├── industry/     # Industry-specific logic
│   │   │   ├── jobs/         # Job management
│   │   │   ├── language/     # Language-related logic
│   │   │   ├── project/      # Project-specific logic
│   │   │   ├── skill/        # Skills management
│   │   │   ├── social/       # Social links/handles
│   │   │   ├── training/     # Training modules
│   │   ├── routes/           # API route definitions
│   ├── config/           # Configuration files for the app
│   ├── enums/            # Enumerations for constants
│   ├── errors/           # Error handling utilities
│   ├── helpers/          # Utility/helper functions
│   ├── interfaces/       # TypeScript interfaces and types
│   ├── shared/           # Shared modules and components
├── app.ts                # Application setup
├── server.ts             # Entry point of the server
├── .env                  # Environment variables (sensitive data)
├── .env.example          # Example environment variables for setup
├── .eslintignore         # ESLint ignore file
├── .eslintrc             # ESLint configuration
├── .gitignore            # Git ignore file
├── .prettierrc           # Prettier configuration
├── package.json          # Node.js project configuration
├── package-lock.json     # Lock file for package versions
├── README.md             # Documentation for the project
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
├── yarn.lock             # Yarn lock file for package versions

```

## 🛠️ Scripts

Key scripts available in `package.json`:

- **`yarn dev`**: Start the development server using `ts-node-dev` with hot reload.
- **`yarn ass`**: Run the `assignment.ts` file with `ts-node-dev`.
- **`yarn prod`**: Start the production server using `ts-node-dev` with the `NODE_ENV=production` environment.
- **`yarn build`**: Compile TypeScript code into JavaScript files.
- **`yarn start`**: Start the compiled production server from the `dist` directory.
- **`yarn prisma:migrate`**: Run database migrations using Prisma.
- **`yarn prisma:generate`**: Generate Prisma client based on the schema.
- **`yarn seed`**: Run the Prisma seed script.
- **`yarn lint:check`**: Check for code quality issues with ESLint.
- **`yarn lint:fix`**: Automatically fix linting issues with ESLint.
- **`yarn prettier:check`**: Format code with Prettier while following `.gitignore` rules.
- **`yarn prettier:fix`**: Format and apply fixes to the code using Prettier.
- **`yarn lint-prettier`**: Run both ESLint and Prettier checks sequentially.
- **`yarn postinstall`**: Automatically generate Prisma client after dependencies are installed.


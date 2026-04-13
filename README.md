# Full-Stack-E-Commerce-MERN-APP
Full Stack E-Commerce MERN APP

![Alt text](Full%20Stack%20E-Commerce%20MERN%20App.png?raw=true "Title")

# ShopAI: Full-Stack E-Commerce & AI Assistant Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A highly scalable, feature-rich full-stack e-commerce platform built using the MERN stack. This application goes beyond standard CRUD operations by integrating a **Multi-Agent AI Assistant** for automated customer support and a **Hybrid Semantic Search Engine** for intelligent product discovery. 

![Project Screenshot](./Full%20Stack%20E-Commerce%20MERN%20App.png)

## ✨ Key Features

* **🤖 Multi-Agent AI Assistant:** Automates customer support workflows and e-commerce ticket resolutions, significantly enhancing issue response times.
* **🔍 Hybrid Semantic Search:** Combines MongoDB regex-based exact keyword matching with an AI-driven semantic search fallback to understand user intent and complex queries.
* **⚡ High Performance & Caching:** Integrates **Redis** to cache frequently accessed backend responses and session data, reducing database load and accelerating API delivery.
* **💳 Secure Payment Gateway:** End-to-end checkout flow and payment validation powered by the **Stripe API**.
* **🔐 Authentication & RBAC:** Secure user authentication using **JSON Web Tokens (JWT)** and Bcrypt, featuring strictly isolated Role-Based Access Control for Users and Administrators.
* **🛒 Advanced State Management:** Utilizes **Redux Toolkit** for seamless synchronization of shopping carts, user sessions, and dynamic product filtering across the React frontend.
* **📱 Responsive UI/UX:** Modern, mobile-first design built with **Tailwind CSS**.

## 🛠️ Technology Stack

### Frontend
* **Framework:** React.js
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose)

### Security & Utilities
* **Authentication:** JWT (JSON Web Tokens), Cookie Parser
* **Payments:** Stripe
* **Image Processing:** Multer / Base64 conversion 

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* Node.js (v14 or higher)
* MongoDB (Local or Atlas setup)
* Stripe Account (for API keys)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/e-commerce.git](https://github.com/yourusername/e-commerce.git)
   cd e-commerce
2. **Setup the Backend:**
   cd backend
   npm install
3. **Setup the Frontend:**
   cd ../frontend
   npm install
4. **Environment Variables:**
Create a .env file in the backend directory and add the following keys:
PORT=8080
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key


ShopAI: Full-Stack E-Commerce & AI Assistant Platform

A highly scalable, feature-rich full-stack e-commerce platform built using the MERN stack. This application goes beyond standard CRUD operations by integrating a Multi-Agent AI Assistant for automated customer support and a Hybrid Semantic Search Engine for intelligent product discovery.

✨ Key Features

🤖 Multi-Agent AI Assistant: Automates customer support workflows and e-commerce ticket resolutions, significantly enhancing issue response times.

🔍 Hybrid Semantic Search: Combines MongoDB regex-based exact keyword matching with an AI-driven semantic search fallback to understand user intent and complex queries.

⚡ High Performance & Caching: Integrates Redis to cache frequently accessed backend responses and session data, reducing database load and accelerating API delivery.

💳 Secure Payment Gateway: End-to-end checkout flow and payment validation powered by the Stripe API.

🔐 Authentication & RBAC: Secure user authentication using JSON Web Tokens (JWT) and Bcrypt, featuring strictly isolated Role-Based Access Control for Users and Administrators.

🛒 Advanced State Management: Utilizes Redux Toolkit for seamless synchronization of shopping carts, user sessions, and dynamic product filtering across the React frontend.

📱 Responsive UI/UX: Modern, mobile-first design built with Tailwind CSS.

🛠️ Technology Stack

Frontend

Framework: React.js

State Management: Redux Toolkit (@reduxjs/toolkit)

Styling: Tailwind CSS

Routing: React Router DOM

Backend

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose)

Caching: Redis

AI Microservice Integration: Python, Axios

Security & Utilities

Authentication: JWT (JSON Web Tokens), Cookie Parser

Payments: Stripe

Image Processing: Multer / Base64 conversion

📂 Architecture & Folder Structure

This project follows a decoupled architecture separating the React client and the Express/Node API.

E-Commerce/
├── backend/                       # Node.js & Express API Server
│   ├── config/                    # Configurations (DB, Redis, Stripe setup)
│   ├── controller/                # Request handlers and business logic
│   │   ├── product/               # Product & Search operations
│   │   └── user/                  # User Auth, Cart & Admin operations
│   ├── helpers/                   # Utility functions & permissions
│   ├── middleware/                # Express middlewares (JWT Auth)
│   ├── models/                    # Mongoose Database Schemas
│   ├── routes/                    # API Route definitions
│   ├── index.js                   # Backend Entry Point
│   └── package.json               # Backend dependencies
│
└── frontend/                      # React.js Client Application
    ├── public/                    # Static assets & index.html
    ├── src/
    │   ├── assest/                # Images, banners, logos
    │   ├── common/                # Shared constants and role configs
    │   ├── components/            # Reusable UI components (Navbar, Cards, etc.)
    │   ├── context/               # React Context APIs
    │   ├── helpers/               # Frontend utilities (Upload, Base64, Formatting)
    │   ├── pages/                 # Route-level views (Home, Login, AdminPanel, AIAssistant)
    │   ├── routes/                # React Router setup
    │   ├── store/                 # Redux Toolkit setup (store.js, userSlice.js)
    │   ├── App.js                 # Main Application Component
    │   └── index.js               # React Entry Point
    ├── tailwind.config.js         # Tailwind CSS configuration
    └── package.json               # Frontend dependencies


Architecture Flow:

Auth Flow: Users log in -> Node.js issues an HTTP-only cookie with a JWT -> Frontend Redux store updates user state. Protected routes verify the JWT via middleware before fulfilling requests.

Search Flow: Search queries hit the Node backend searchProduct.js controller. If direct DB regex matches fail or the confidence threshold is low, the system queries the integrated AI model via Axios to perform semantic evaluation and return contextual results.

Payment Flow: User proceeds to checkout -> Frontend calls backend to generate a Stripe session -> Stripe securely tokenizes payment -> Backend verifies the transaction webhook.

🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

Prerequisites

Node.js (v14 or higher)

MongoDB (Local or Atlas setup)

Redis server running locally or via cloud

Stripe Account (for API keys)

1. Clone the repository

git clone [https://github.com/nick2726/e-commerce.git](https://github.com/nick2726/e-commerce.git)
cd e-commerce


2. Setup the Backend

cd backend
npm install


3. Setup the Frontend

cd ../frontend
npm install


4. Environment Variables

Create a .env file in the backend directory and add the following keys:

PORT=8080
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
# Add your AI Service API keys if applicable


5. Run the Application

Open two separate terminals to run the client and server concurrently.

Terminal 1 (Backend):

cd backend
npm start


Terminal 2 (Frontend):

cd frontend
npm start


🤝 Contact & Connect

Nikhil Kumar Jha * GitHub

If you are a recruiter or hiring manager reviewing this project, feel free to reach out regarding Full-Stack or Backend Engineering opportunities!


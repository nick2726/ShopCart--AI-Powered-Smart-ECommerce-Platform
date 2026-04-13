

# AuraCart: Full-Stack E-Commerce & AI Assistant Platform

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
   2. Setup the Backend:
cd backend
npm install

3. Setup the Frontend:
cd ../frontend
npm install

4. Environment Variables:
Create a .env file in the backend directory and add the following keys:
PORT=8080
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
Add your AI Service API keys if applicable

5. Run the Application:
Open two terminals.

Terminal 1 (Backend):
cd backend
npm start

Terminal 2 (Frontend):
cd frontend
npm start

📁 Architecture Overview
This project utilizes a decoupled architecture where the React frontend communicates with the Express backend via RESTful APIs.

Auth Flow: Users are authenticated via HTTP-only cookies storing JWTs.

Search Flow: Search queries hit the Node backend; if direct DB matches fail or threshold is low, Axios routes the query to an external AI/Python service for vector/semantic evaluation.

Payment Flow: Stripe handles the secure tokenization of payment methods, ensuring PCI compliance.



Nikhil Kumar Jha * GitHub

If you are a recruiter or hiring manager reviewing this project, feel free to reach out regarding Full-Stack or Backend Engineering opportunities!


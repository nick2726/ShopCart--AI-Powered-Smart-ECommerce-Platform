# Full-Stack-E-Commerce-MERN-APP
Full Stack E-Commerce MERN APP

![Alt text](Full%20Stack%20E-Commerce%20MERN%20App.png?raw=true "Title")

# ShopAI: Full-Stack E-Commerce & AI Assistant Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
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
* **Caching:** Redis
* **AI Microservice Integration:** Python, Axios

### Security & Utilities
* **Authentication:** JWT (JSON Web Tokens), Cookie Parser
* **Payments:** Stripe
* **Image Processing:** Multer / Base64 conversion 

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* Node.js (v14 or higher)
* MongoDB (Local or Atlas setup)
* Redis server running locally or via cloud
* Stripe Account (for API keys)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/e-commerce.git](https://github.com/yourusername/e-commerce.git)
   cd e-commerce

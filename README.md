# 🚖 Ride Sharing Application

A full-stack Ride Sharing Application that allows users to book rides, make payments, and rate drivers. This project is built using React, Node.js, Express.js, Prisma ORM, and PostgreSQL.

## 📌 Features

- 🔐 User Registration & Login (JWT Authentication)
- 🚖 Book a Ride
- 👨‍✈️ Driver Assignment
- 📍 View Ride Details
- 💳 Payment System
- ⭐ Driver Rating & Reviews
- 🗄️ PostgreSQL Database Integration
- 🔒 Secure API Authentication

## 🛠️ Technologies Used

### Frontend
- React.js (Vite)
- Axios
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

## 📂 Project Structure

```
ride-sharing/
│
├── ride-sharing-backend/
│   ├── prisma/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   ├── server.js
│   └── package.json
│
├── ride-sharing-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/laharithamminini-stack/ride-sharing.git
cd ride-sharing
```

### Backend Setup

```bash
cd ride-sharing-backend
npm install
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd ride-sharing-frontend
npm install
npm run dev
```

## 🗃️ Database

- PostgreSQL
- Prisma ORM

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

## 📸 Features Implemented

- ✅ User Authentication
- ✅ Ride Booking
- ✅ Driver Assignment
- ✅ Ride Details
- ✅ Payment
- ✅ Review & Rating System

## 🌱 Future Enhancements

- Google Maps Integration
- Live Driver Tracking
- Razorpay/Stripe Payment Gateway
- Email Notifications
- Admin Dashboard

## 👩‍💻 Author

**Lakshmi Priya**

- GitHub: https://github.com/laharithamminini-stack

---

⭐ If you like this project, don't forget to star the repository!
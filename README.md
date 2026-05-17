
# ⚖️ Court Case Management System

A full-stack **Court Case Management System** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** to streamline judicial workflows such as case handling, hearing scheduling, document management, and role-based access.

The platform is designed with a **modern Supreme Court of India-inspired UI/UX**, delivering a professional judiciary dashboard experience while maintaining secure and scalable backend functionality.

---

## 📌 Project Overview

The **Court Case Management System** digitizes and simplifies court-related administrative processes.

The system supports multiple user roles such as:

- **Admin**
- **Judge**
- **Lawyer**
- **Clerk**

Each role has dedicated access and permissions using **Role-Based Access Control (RBAC)**.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Secure password hashing using `bcryptjs`
- Role-Based Access Control (RBAC)

### ⚖️ Case Management
- Register new court cases
- Track and update case status
- View case details
- Role-based case access

### 📅 Hearing Scheduling
- Schedule court hearings
- Manage hearing information
- Track hearing updates

### 📂 Document Management
- Upload legal documents using `Multer`
- Manage case-related files
- Organized document handling

### 📊 Dashboard Analytics
- Visual insights using `Recharts`
- Case statistics
- Hearing analytics
- System overview

### 📑 Reporting & Logs
- Generate reports
- Export PDFs using `jsPDF`
- Activity logging

### 🎨 Modern Judiciary UI/UX
- Supreme Court of India inspired design
- Professional dashboard layout
- Clean navigation
- Responsive interface
- Better visual hierarchy

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Recharts
- jsPDF

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer

---

## 🏗️ Project Structure

```text
court-case-project/
│
├── frontend/              # React Frontend (Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/               # Node.js + Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (v16 or above)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn

---

# 1️⃣ Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb://localhost:27017/court-case
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm start
```

Backend will run on:

```text
http://localhost:3000
```

---

# 2️⃣ Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Vite development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 👨‍⚖️ User Roles

| Role | Access |
|------|--------|
| Admin | Full system management |
| Judge | Case review & hearing management |
| Lawyer | Case tracking & legal documents |
| Clerk | Case entry & document handling |

---

## 📸 Screenshots

### Login Page
_Add project screenshot here_

```md
![Login](screenshots/login.png)
```

### Dashboard
_Add project screenshot here_

```md
![Dashboard](screenshots/dashboard.png)
```

### Case Management
_Add project screenshot here_

```md
![Cases](screenshots/cases.png)
```

### Hearing Management
_Add project screenshot here_

```md
![Hearings](screenshots/hearings.png)
```

---

## 🔮 Future Improvements

- Real-time notifications
- Advanced search filters
- Calendar-based hearing management
- Role activity tracking
- Better analytics dashboard
- Cloud file storage

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Rahul Chauhan**

Computer Science & Engineering Student  
Passionate about **Software Development, AI, Data Science & Full Stack Development**

---

⭐ If you found this project useful, consider giving it a **star** on GitHub.

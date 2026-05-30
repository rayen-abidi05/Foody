# 🍽️ FOODY — Recipe Management Web Application

> An interactive web platform for exploring, managing, and tracking nutritional information across healthy and famous dishes.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)

---

## 📖 About The Project

With the growing interest in nutrition and healthy living, people increasingly want to take control of what they eat. **FOODY** bridges the gap between healthy eating and popular gastronomy by offering a fast, interactive recipe consultation and management platform.

Recipes are organized into two main categories:

- 🥗 **Healthy Dishes** — Balanced and nutritious recipes tailored for people who want to monitor their diet.
- 🍕 **Famous Dishes** — Popular and traditional recipes beloved by the general public.

For each recipe, users can view detailed **nutritional values** (calories, macronutrients) alongside the **preparation method**. Registered users also get access to **MyKitchen** — a private member space for full personal recipe management.

---

## ✨ Features

### 🌐 Public Access
- Browse recipes split into two categories: Healthy Dishes & Famous Dishes
- View full nutritional information (calories, macronutrients) per recipe
- View preparation methods and ingredients for any recipe
- User registration and authentication

### 🔐 MyKitchen (Private Member Space)
- View and manage personal recipes
- Add new personal recipes
- Edit existing personal recipes
- Delete personal recipes

### 🛠️ Admin / Management
- Manage public recipes (add, edit, delete)
- Oversee both recipe categories

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [Next.js](https://nextjs.org/) |
| Backend | [Express.js](https://expressjs.com/) |
| Database | MySQL (SQL) |
| Auth | JWT / Session-based *(update as needed)* |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) (v8+)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/foody.git
cd foody
```

2. **Install dependencies for both frontend and backend**

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `server/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=foody_db
JWT_SECRET=your_jwt_secret
```

Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Set up the database**

```bash
mysql -u your_mysql_user -p < server/database/schema.sql
```

5. **Run the application**

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🌍 Live Demo

> 🔗 Coming soon — deployment link will be added here.

---

## 📁 Project Structure

```
foody/
├── client/                  # Next.js frontend
│   ├── app/                 # App router pages
│   ├── components/          # Reusable UI components
│   └── public/              # Static assets
│
├── server/                  # Express.js backend
│   ├── routes/              # API route handlers
│   ├── controllers/         # Business logic
│   ├── models/              # Database models
│   ├── middleware/          # Auth & validation middleware
│   └── database/            # SQL schema & migrations
│
└── README.md
```

---

## 📡 API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/recipes` | Get all public recipes | No |
| `GET` | `/api/recipes/:id` | Get a single recipe | No |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login | No |
| `GET` | `/api/mykitchen` | Get personal recipes | ✅ Yes |
| `POST` | `/api/mykitchen` | Add a personal recipe | ✅ Yes |
| `PUT` | `/api/mykitchen/:id` | Update a personal recipe | ✅ Yes |
| `DELETE` | `/api/mykitchen/:id` | Delete a personal recipe | ✅ Yes |
| `POST` | `/api/admin/recipes` | Add a public recipe | ✅ Admin |
| `PUT` | `/api/admin/recipes/:id` | Edit a public recipe | ✅ Admin |
| `DELETE` | `/api/admin/recipes/:id` | Delete a public recipe | ✅ Admin |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is developed as part of an academic project — **U.V. 2025–2026**.  
All rights reserved © FOODY Team.

---

## 👨‍💻 Authors

> Add your team members here.

- **Abidi Rayen** — [@rayen-abidi05]([https://github.com/your-github](https://github.com/rayen-abidi05))

---

*Made with ❤️ and a passion for good food.*

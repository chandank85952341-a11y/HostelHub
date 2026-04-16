# 🏗 MongoDB & Backend Setup Guide

## ✅ Configuration Completed

### 📁 Database Setup
- **Database Name:** `hostelhub`
- **Host:** `localhost` or `127.0.0.1`
- **Port:** `27017`
- **Connection String:** `mongodb://127.0.0.1:27017/hostelhub`

### 📋 Environment Variables (.env)
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hostelhub
JWT_SECRET=secretkey123
NODE_ENV=development
```

---

## 🚀 Starting the Application

### **Step 1: Start MongoDB**
```bash
# MongoDB should already be running
# If not, run:
net start MongoDB
```

### **Step 2: Initialize Database (First Time Only)**
```bash
cd backend
node database/init-all.js
```

**Output:**
```
✅ MongoDB Connected Successfully!
✅ Admin created: admin@hostelhub.com
✅ User created: ankit@gmail.com (customer)
✅ User created: priya@gmail.com (owner)
✅ User created: rahul@gmail.com (customer)
```

### **Step 3: Start Backend Server**
```bash
node backend/server.js
```

**Expected Output:**
```
✅ MongoDB Connected to mongodb://127.0.0.1:27017/hostelhub
📦 Database: hostelhub
🚀 Server running on port 5000
```

### **Step 4: Start Frontend (New Terminal)**
```bash
npm run dev
```

**Frontend runs on:** `http://localhost:8083` or `http://172.17.0.235:8083`

---

## 🧪 Testing the API

### **Test 1: Check Database Connection**
```
GET http://localhost:5000/db-check
```

**Response:**
```json
{
  "ok": true,
  "message": "Database connected",
  "database": "hostelhub",
  "collections": ["users", "admins"]
}
```

### **Test 2: User Registration**
```
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Ankit",
  "email": "ankit@gmail.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ankit",
    "email": "ankit@gmail.com",
    "role": "customer"
  }
}
```

### **Test 3: User Login**
```
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "ankit@gmail.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ankit",
    "email": "ankit@gmail.com",
    "role": "customer"
  }
}
```

### **Test 4: Get All Users**
```
GET http://localhost:5000/api/users/list
```

**Response:**
```json
{
  "ok": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ankit Kumar",
      "email": "ankit@gmail.com",
      "role": "customer",
      "createdAt": "2026-03-17T10:00:00Z"
    }
  ]
}
```

### **Test 5: Admin Login**
```
POST http://localhost:5000/api/admin/login
Content-Type: application/json

{
  "email": "admin@hostelhub.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "ok": true,
  "admin": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Platform Administrator",
    "email": "admin@hostelhub.com",
    "permissions": ["manage_owners", "manage_pgs", ...]
  }
}
```

---

## 📊 Database Collections

After initialization, your **hostelhub** database contains:

```
hostelhub/
├── users (Demo users: ankit@gmail.com, priya@gmail.com, rahul@gmail.com)
├── admins (Admin: admin@hostelhub.com)
├── owners (PG owners)
├── pgs (Hostels/PGs)
├── rooms (Rooms)
└── bookings (Bookings)
```

---

## 🔧 API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/list` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/list` - List all admins
- `POST /api/admin/create` - Create new admin
- `GET /api/admin/owners` - Get all owners
- `PUT /api/admin/owners/:id/approve` - Approve owner
- `PUT /api/admin/owners/:id/block` - Block owner
- `GET /api/admin/stats` - Get statistics

---

## 👥 Demo Credentials

### Admin Account
```
Email: admin@hostelhub.com
Password: admin123
Portal: http://localhost:8083/admin/login
```

### Demo Users
```
1. Ankit Kumar (Customer)
   Email: ankit@gmail.com
   Password: 123456

2. Priya Sharma (Owner)
   Email: priya@gmail.com
   Password: 123456

3. Rahul Singh (Customer)
   Email: rahul@gmail.com
   Password: 123456
```

---

## 🐛 Troubleshooting

### ❌ "MongoDB Connection Failed"
**Solution:** Make sure MongoDB is running
```bash
net start MongoDB
```

### ❌ "Port 5000 already in use"
**Solution:** Kill the process using that port or use a different port
```bash
# Find process on port 5000
Get-NetTCPConnection -LocalPort 5000
# Kill it or change PORT in .env
```

### ❌ "No database found"
**Solution:** This is normal! Database is created when you insert data. Run `init-all.js` first.

### ❌ "Deprecation warnings"
**Solution:** These are just warnings and can be ignored. They don't affect functionality.

---

## 📱 Frontend Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin control panel

---

## ✨ Next Steps

1. ✅ Database configured
2. ✅ Backend API setup
3. ✅ User authentication  ready
4. ✅ Admin system ready
5. ⏳ Connect authentication to frontend (coming next)
6. ⏳ Add PG/Hostel listing system
7. ⏳ Add booking system

---

## 📚 File Structure

```
backend/
├── .env (Configuration)
├── server.js (Main server)
├── config/
│   └── db.js (MongoDB connection)
├── models/
│   ├── User.js
│   ├── Admin.js
│   ├── Owner.js
│   └── ...
├── routes/
│   ├── users.js
│   ├── admin.js
│   ├── test.js
│   └── ...
└── database/
    ├── init-all.js (Initialize everything)
    ├── init-admin.js (Initialize admin)
    └── init.js (Legacy)
```

---

**🎉 Setup Complete! Your MongoDB & Backend are ready to use!**

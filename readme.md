# 🍽️ Restaurant Management Website

A full-featured MERN Stack Restaurant Management system built to streamline food service operations, enhance customer interaction, and modernize the dining experience — all wrapped in a responsive and recruiter-friendly UI.

## 🚀 Live Site

[👉 Click to Visit Live Site](https://b11-assaignment-resturent-project.netlify.app)

---

## 📂 Repositories

- **Client Repo:** [GitHub Client Repository](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-Arpan-collab)
- **Server Repo:** [GitHub Server Repository](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-Arpan-collab/tree/main)

---

## 🛠️ Tech Stack

### 🔹 Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Firebase Authentication
- Yet Another React Lightbox
- Moment.js
- Framer Motion (Animations)
- TanStack Query (Advanced state management)

### 🔸 Backend

- Node.js
- Express.js
- MongoDB (with native MongoDB Driver)
- CORS
- dotenv (Environment Variables)
- JSON Web Token (JWT)

---

## 🔐 Authentication & Security

- Firebase email/password authentication + Google login
- JWT Token-based protected API access
- Firebase & MongoDB credentials securely managed via `.env` files

---

## 🖼️ Core Features

### ✅ Public Pages

- **Home**: Banner with CTA, Top Foods (based on `purchaseFoodCount`), and two extra sections.
- **All Foods**: Searchable list of food items with filters and "Details" view.
- **Single Food Page**: In-depth view with purchase functionality and quantity logic.
- **Gallery**: Lightbox-powered static gallery with infinite scroll and entry animations.
- **Login/Register**: Secure authentication with client-side validation and social login.

### 🔒 Private Pages

- **Add Food**: Add new items with user info and image upload.
- **My Foods**: View, update, and manage only your own added items.
- **My Orders**: List of all purchased items with delete functionality.

---

## 📸 UI Highlights

- 🌗 Dark/Light theme toggle with full system adaptability
- 🎨 Recruiter-friendly color scheme, spacing & typography
- 🧭 Intuitive Navigation with conditional links and profile dropdown
- ⚡ Toast/Sweetalert2 for all user feedback and confirmations
- 📱 Fully responsive (Mobile, Tablet, Desktop)

---

## 🔥 Challenges Handled

- ✅ Prevent users from purchasing their own food
- ✅ Purchase quantity cannot exceed stock or be 0
- ✅ Infinite scroll in gallery page
- ✅ Search & filter with MongoDB’s `$and`/`$or` operators
- ✅ JWT handling for email/password & social logins
- ✅ Prevent redirect on private route reloads
- ✅ Deployed securely with proper domain whitelisting and error handling

---

## 🌍 Deployment Info

- **Frontend:** Netlify
- **Backend:** Render / Vercel / Cyclic
- Firebase Auth: Domain added & CORS errors resolved
- Page reloads from any route work without error
- All protected routes redirect only when unauthorized

---

## 📝 Extra Notes

- 🔄 At least **15 meaningful commits** on the client side
- 🔄 At least **8 meaningful commits** on the server side
- 📄 README written for clarity and recruitability
- 🌟 Spinner and animation added on loading data
- 🧪 TanStack Query used for query/mutation handling

---

## 📦 NPM Packages Used

- `react-router-dom`
- `firebase`
- `axios`
- `jsonwebtoken`
- `cors`
- `dotenv`
- `moment`
- `sweetalert2`
- `yet-another-react-lightbox`
- `framer-motion`
- `@tanstack/react-query`

---

## ✨ Inspiration & Guidance

This project was built with a heart full of passion and a mind sharpened by deadlines. If you're a recruiter or collaborator — I invite you to click through, explore the code, and see how modern food management meets elegant design.

> "Food is love — and great code serves it hot." 🍝💻

---

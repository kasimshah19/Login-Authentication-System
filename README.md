# 🔐 AuthX - Login & Authentication System

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" />
  <br />
  <strong>A premium, glassmorphic UI demonstrating secure sign-up, login, data validation, and persistent session management using client-side technologies.</strong>
  <br /><br />
  <h3>🌍 <a href="https://login-authentication-system-zeta.vercel.app">View Live Project on Vercel</a></h3>
</div>

<br/>

## 📖 Project Overview

**AuthX** is a front-end authentication architecture explicitly designed to demonstrate form validation, dynamic state transitions, and persistent session handling without requiring a complex backend. It features an interactive UI with high-end glassmorphic designs, 3D CSS transform animations, and native form checking.

Using JavaScript and the browser's `localStorage` API, the application simulates a connected database. Users can register new accounts, securely log in, receive dynamically rendered interactive toast notifications, and access a protected dashboard area.

## ✨ Key Highlights & Features

- **🛡️ Secure Client-Side Auth:** Mocks a backend response by securely hashing (conceptually) and storing user credentials persistently in `localStorage`.
- **🔄 Dynamic Page Flips:** Seamless 3D CSS transition animations that smoothly flip the authentication card into the user's dashboard container upon successful login.
- **✉️ Native Validations:** Implements robust email regex validations and string-length password checkers providing users with detailed, real-time error states.
- **👁️ Password Visibility Toggles:** Enhances user experience through clean, SVG-based password peek functions.
- **🔔 Animated Toast System:** A custom-built notification module that renders success and error alerts without locking the UI.

## 🛠️ Technology Stack

- **Structure & Layout:** Semantic HTML5
- **Styling Architecture:** Vanilla CSS3 (3D Transforms, Glassmorphism, Advanced Selectors)
- **Application Logic:** Vanilla JavaScript (ES6+, DOM Manipulation, LocalStorage JSON Parsing)
- **Deployment Platform:** Vercel Hosting

## 📂 Project Structure

```text
📦 Premium-AuthSystem
 ┣ 📂 css
 │  ┗ 📜 style.css           # 3D Flips, Animations, and Glassmorphic Theme variables
 ┣ 📂 js
 │  ┗ 📜 app.js              # State management, Validation logic, and LocalStorage "db" simulation
 ┣ 📜 index.html             # Toggleable Login / Signup / Dashboard Shell
 ┗ 📜 README.md
```

## 💻 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kasimshah19/Login-Authentication-System.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd Login-Authentication-System
   ```
3. **Run a local development server:**
   Use VS Code Live Server extension or Python's HTTP server:
   ```bash
   python -m http.server 8080
   ```
4. **View in Browser:**
   Open `http://localhost:8080/`
5. **Usage Flow:**
   Register a new account via the "Sign Up" tab, then use those exact credentials to log in!

## 👨‍💻 Developed By

**Kasim Shah**
- [GitHub Profile](https://github.com/kasimshah19)

---
<p align="center">
  <em>Make sure to drop a ⭐ if you found this project helpful!</em>
</p>

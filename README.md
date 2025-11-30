# Login System with LocalStorage– Quiz 1

A simple Login and Registration System built using HTML, CSS, and JavaScript on React+Vite.  
All user data is stored in LocalStorage as required by the Advance Web Development – Quiz 1 instructions.  

---

## Features

- User Registration (Signup)
- User Login
- Client-Side Form Validation
- LocalStorage as Database
- Session Handling using LocalStorage
- Protected Dashboard Page
- Logout Functionality
- Simple and Clean UI

---


## About env.txt (IMPORTANT)

Created a .env or .env.local file during development:

Renamed it to:

env.txt





---

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | HTML, CSS, JavaScript, React+Vite |
| Backend | Mongodb |
| Version Control | Git & GitHub |
| Environment File | env.txt |

---

## How to Run the Project


1. Download or clone the repository
2. Open the project folder
3. Right-click on index.html
4. Select *Open with Live Server*  
   (or simply open it in your browser)

---

## How the System Works

### 1. Registration

- Validates name, email, and password
- Saves user data in LocalStorage
- Prevents duplicate email signup

### 2. Login

Compares entered credentials with LocalStorage data.  
If correct, creates the following session values:


isLoggedIn = true
currentUser = <email>


### 3. Dashboard (Protected Page)

- Accessible only if isLoggedIn = true
- Otherwise redirects to login.html

### 4. Logout

- Clears session values
- Redirects to the login page

---

## Clone This Repository

bash
git clone https://github.com/<your-username>/Login-System-with-LocalStorage-and-without-Models-Quiz-1.git
cd Login-System-with-LocalStorage-and-without-Models-Quiz-1

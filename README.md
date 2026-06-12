# PetAdopt – Pet Adoption Platform

A full-featured pet adoption web app connecting shelters, adopters, and admins. Built with vanilla JavaScript and Firebase, deployed on GitHub Pages.

---

## Live Demo

> **Live:** https://swathiguttula.github.io/petadopt/

| Role    | How to access |
|---------|--------------|
| Adopter | Register with any email |
| Shelter | Register → set role to `shelter` in Firestore |
| Admin   | Register → set role to `admin` in Firestore |

---

## Features

- **Firebase Authentication** — Email/password + Google Sign-In with role-based access (adopter / shelter / admin)
- **Real-time Firestore** — All pet listings and applications update live without page refresh
- **Browse & Filter** — Search pets by name, breed, gender, location, and adoption status
- **Adoption Applications** — 4-section application form; adopters track status in real time
- **Shelter Dashboard** — Add/manage pet listings, review and update application statuses
- **Admin Panel** — Manage all users, pets, and applications; change user roles
- **Firebase Security Rules** — Role-based Firestore rules preventing unauthorized access

---

## Tech Stack

| Layer    | Tech |
|----------|------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Database | Firebase Firestore (real-time NoSQL) |
| Auth     | Firebase Authentication |
| Hosting  | GitHub Pages |

---

## Project Structure

```
petadopt/
├── index.html                  ← Home page
├── css/style.css               ← Global styles
├── js/
│   ├── firebase-config.js      ← Firebase configuration
│   └── app.js                  ← Shared utilities & auth
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── browse.html             ← Pet listings with filters
│   ├── pet-detail.html
│   ├── apply.html              ← Adoption application form
│   ├── my-applications.html   ← Adopter dashboard
│   ├── shelter-dashboard.html ← Shelter management
│   └── admin-dashboard.html   ← Admin panel
└── firestore.rules             ← Security rules
```

---

## Architecture

- **No backend server** — Firebase handles auth, database, and real-time sync
- **Firestore security rules** enforce role-based access at the database level
- **Client-side routing** between pages using relative URLs
- **Real-time listeners** (`onSnapshot`) keep UI in sync without polling

---

## Local Setup

1. Clone the repo
```bash
git clone https://github.com/SwathiGuttula/petadopt.git
```

2. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
3. Enable **Email/Password** and **Google** authentication
4. Create a **Firestore** database (asia-south1 region)
5. Paste your Firebase config into `js/firebase-config.js`
6. Open `index.html` in a browser or use Live Server

---

## Author

**Swathi Guttula**  
B.Tech Computer Science, KL University  
[GitHub](https://github.com/SwathiGuttula) · [LinkedIn](https://linkedin.com/in/swathiguttula)

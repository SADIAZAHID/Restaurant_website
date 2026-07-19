# Elysium – Modern Fine Dining Web Application

Elysium is a premium, responsive, and full-stack web application designed for a luxury fine dining restaurant. It provides a visual showcase of culinary masterpieces and features a live, server-integrated table reservation system.

---

## 🚀 Key Features

### 🎨 Frontend (UI/UX)
* **Premium & Responsive Design**: Crafted with a modern dark theme, smooth gradient backgrounds, elegant typography (Outfit & Playfair Display from Google Fonts), and sophisticated glassmorphic cards.
* **Sticky Smart Navbar**: Features smooth transition triggers, changing style and transparency as the user scrolls down the page.
* **Dynamic Menu Showcase**: Displays a curated selection of culinary items in a structured, responsive grid layout.
* **Scroll-Activated Reveal Animations**: Utilizes the modern browser **Intersection Observer API** for high-performance, GPU-accelerated fade-and-rise animations as cards enter the viewport.
* **Interactive Booking Form**: Includes real-time submission feedback, handling states like *Confirming...*, *Reservation Confirmed!*, and error recovery gracefully.

### ⚙️ Backend (API Server)
* **Express.js API Server**: A reliable Node.js server that hosts and serves all static assets (HTML, CSS, JS, and images).
* **Reservation Engine**: Real API integration that accepts bookings, validates request payloads, and persists reservation details server-side.
* **Data Persistence**: Stores bookings securely in a JSON-based local database (`reservations.json`) with unique IDs and creation timestamps.
* **CORS Enabled**: Configured for cross-origin resource sharing, allowing the frontend to communicate with the API even if running on different ports or domains.

---

## 📂 Project Structure

```text
d:/Webpages/
│
├── backend/
│   ├── server.js            # Node/Express server and REST API logic
│   ├── package.json         # Node metadata and server dependencies (Express, CORS)
│   └── reservations.json    # JSON database storing booking records (auto-generated)
│
├── assets/                  # Media assets and menu images
├── Modern_Restaurant_Webpage.html  # Main structural layout
├── Modern_Restaurant_Webpage.css   # Modern global design system & styles
├── Modern_Restaurant_Webpage.js    # Client-side interactivity and API integration
├── .gitignore               # Config to prevent uploading temp/unnecessary files
└── README.md                # Project documentation
```

---

## 🛠️ API Documentation

### 1. Create a Reservation
* **Endpoint**: `/api/reservations`
* **Method**: `POST`
* **Content-Type**: `application/json`
* **Request Body**:
```json
{
  "name": "Jane Doe",
  "date": "2026-07-25",
  "guests": "2"
}
```
* **Response (201 Created)**:
```json
{
  "message": "Reservation successfully created!",
  "reservation": {
    "id": "1689785890000",
    "name": "Jane Doe",
    "date": "2026-07-25",
    "guests": "2",
    "createdAt": "2026-07-19T17:18:10.000Z"
  }
}
```

### 2. Get All Reservations
* **Endpoint**: `/api/reservations`
* **Method**: `GET`
* **Response (200 OK)**:
```json
[
  {
    "id": "1689785890000",
    "name": "Jane Doe",
    "date": "2026-07-25",
    "guests": "2",
    "createdAt": "2026-07-19T17:18:10.000Z"
  }
]
```

---

## 💻 Local Setup & Execution

1. **Install Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Server**:
   ```bash
   npm start
   ```
5. **Access the App**: Open your browser and navigate to `http://localhost:3000`.

---

## 🌐 Deploying Globally

To publish this website online:
1. Push the project files to a **Public** GitHub repository.
2. Log in to [Render](https://render.com/) or [Railway](https://railway.app/).
3. Connect your GitHub repository.
4. Set the **Root Directory** to `backend`, the **Build Command** to `npm install`, and the **Start Command** to `npm start`.

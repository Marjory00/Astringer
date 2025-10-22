
# 📦 Astringer: Courier Logistics Tracking System

## 🚀 Project Overview

**Astringer** is a modern, full-stack application designed for courier and parcel logistics tracking. It provides a simple, performance-focused dashboard for viewing the real-time status and estimated delivery of various shipments. The project adheres to modern architectural principles, using a decoupled **Angular frontend** for a fast user experience and a simple, secure **Node.js/Express backend** to handle API requests.

| Key Features | Status Tracking, Location Display, Estimated Delivery Dates |
| :--- | :--- |
| **Architecture** | Monorepo (Frontend and Backend in a single repository) |
| **Reactivity** | Zoneless Angular with Signals (for optimal frontend performance) |
| **API** | RESTful API for shipment data |

***

## 💡 Case Study: Courier Tracking Dashboard

The core use case for Astringer is to provide employees or customers with instant visibility into the delivery pipeline.

| Scenario | Component/Functionality |
| :--- | :--- |
| **Data Fetching** | Frontend **`CourierService`** sends an HTTP request to the Express API. |
| **Backend Simulation** | Backend's **`server.js`** returns mock data representing various shipment states (e.g., "In Transit 🚚," "Delivered ✅"). |
| **Real-Time Display** | The Angular component uses the reactive, **Zoneless** model to update the UI instantly whenever new data arrives, minimizing unnecessary checks and maximizing speed. |

***

## 📂 File Structure

The project uses a common **monorepo** structure to keep the frontend and backend logically separated but within the same Git repository.

```
Astringer/ ├── backend/ # Node.js/Express API (Sensitive data lives here) │ ├── node_modules/ # 🔒 Protected by .gitignore │ ├── package.json │ └── server.js # Main Express server and API routes ├── frontend/ # Angular Application │ ├── src/ │ │ ├── app/ │ │ │ ├── app.component.* │ │ │ └── courier.service.ts # Handles communication with the backend │ │ └── ... (Angular files) │ └── angular.json ├── .gitignore # Protects node_modules and sensitive backend files └── README.md
```

***

## 🌐 Languages & Technologies Used

| Layer | Language/Framework | Role |
| :--- | :--- | :--- |
| **Frontend** | **Angular** (Modern Zoneless setup) | User Interface and Data Display |
| **Frontend Language** | **TypeScript** | Strongly typed application logic |
| **Backend** | **Node.js** with **Express.js** | Creating the RESTful API and handling requests |
| **Styling** | **SCSS** | Modular and efficient styling |
| **Reactivity** | **Angular Signals** (via Zoneless) | High-performance, explicit state management |

***

## 👤 Author

**Marjory Marquez**

# 📦 Astringer: Courier Logistics Tracking System

## 🚀 Project Overview


**Astringer** is a modern, full-stack application designed for courier and parcel logistics tracking. It provides a simple, performance-focused dashboard for viewing the **real-time status, operational health, and critical performance metrics** of various shipments and backend services. The project adheres to modern architectural principles, using a decoupled **Angular frontend** for a fast user experience and a simple, secure **Node.js/Express backend** to handle API requests.

```
| Key Features | Status Tracking, Location Display, Estimated Delivery Dates, **System Health Monitoring, Operational KPIs** |
| :--- | :--- |
| **Architecture** | Monorepo (Frontend and Backend in a single repository) |
| **Reactivity** | Zoneless Angular with Signals (for optimal frontend performance) |
| **API** | RESTful API for shipment data |
```

***

## 💡 Case Study: Courier Tracking Dashboard

The core use case for Astringer is to provide employees with instant, high-level visibility into the entire logistics operation, from IT health to delivery efficiency.


| Scenario | Component/Functionality |
| :--- | :--- |
| **IT Monitoring** | **System Health Monitor** checks the latency and status of key services like WMS, TMS, and Billing API. |
| **Efficiency Analysis** | **Operational Performance Metrics (KPIs)** track key rates, including On-Time Delivery Rate, Average Weight, and Exception Rate. |
| **Route Visualization** | **Geographic Hotspots** section provides a placeholder for a map view, highlighting areas with high traffic or recent exceptions. |
| **Real-Time Display** | The Angular component uses the reactive, **Zoneless** model to update the UI instantly whenever new data arrives, minimizing unnecessary checks and maximizing speed. |

***

## 📂 File Structure

The project uses a common **monorepo** structure to keep the frontend and backend logically separated but within the same Git repository.

```
Astringer/ ├── backend/ # Node.js/Express API (Sensitive data lives here) │ ├── node_modules/ # 🔒 Protected by .gitignore │ ├── package.json │ └── server.js # Main Express server and API routes ├── frontend/ # Angular Application │ ├── src/ │ │ ├── app/ │ │ │ ├── app.component.* │ │ │ ├── dashboard/ # New component with enhanced features │ │ │ └── core/services/shipment.service.ts # Handles communication with the backend │ │ └── ... (Angular files) │ └── angular.json ├── .gitignore # Protects node_modules and sensitive backend files └── README.md
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


---

## 🛠️ Installation and Setup

To run Astringer locally, you need **Node.js** (version 16 or higher) and the **Angular CLI** installed globally.

### 1. Clone the Repository

```bash
git clone [https://github.com/your-repo/Astringer.git](https://github.com/your-repo/Astringer.git)
cd Astringer/

## 2. Install Dependencies

Since this is a monorepo, you must install dependencies for both the backend and frontend separately.

### Backend Setup

```bash
cd backend/
npm install

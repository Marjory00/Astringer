# 📦 Astringer: Courier Logistics Tracking System

## 🚀 Project Overview

**Astringer** is a modern, full-stack application designed for courier and parcel logistics tracking. It provides a simple, performance-focused dashboard for viewing the **real-time status, operational health, and critical performance metrics** of various shipments and backend services. The project adheres to modern architectural principles, using a decoupled **Angular frontend** for a fast user experience and a simple, secure **Node.js/Express backend** to handle API requests.

| Key Features | Status Tracking, Location Display, Estimated Delivery Dates, **System Health Monitoring, Operational KPIs** |
| :--- | :--- |
| **Architecture** | Monorepo (Frontend and Backend in a single repository) |
| **Reactivity** | Zoneless Angular with Signals (for optimal frontend performance) |
| **API** | RESTful API for shipment data |

***

## 💡 Case Study: Optimizing Courier Operations with Astringer

This project addresses the critical need for **unified visibility and proactive monitoring** in a distributed logistics environment.

### 1. The Problem: Operational Blind Spots 🚨
Logistics companies often rely on disparate systems for warehouse management (WMS), route planning (TMS), and customer billing. This creates fragmentation, leading to:
* **Delayed Issue Detection:** Technical errors (e.g., Billing API going offline) often aren't noticed until they impact operations hours later.
* **Inefficient Analysis:** Managers lack a real-time, consolidated view of key performance indicators (like Exception Rate) needed to make daily strategic decisions.
* **Slow UI Performance:** Traditional web apps struggle to update large shipment tables reactively without slowing the user interface.

### 2. The Solution: Unified Reactive Dashboard ✅
Astringer solves these challenges by centralizing monitoring and leveraging high-performance front-end architecture:
* **System Health Integration:** The **System Health Monitor** actively tracks latency and status for WMS, TMS, and external APIs, offering an immediate warning of service degradation.
* **Metrics-Driven View:** The **Operational Performance Metrics (KPIs)**, including On-Time Delivery Rate and Exception Rate, are calculated client-side from the primary data stream, providing instant, actionable intelligence.
* **High-Speed Reactivity:** The use of **Zoneless Angular with Signals** ensures that the massive shipment table and all related KPIs update only when data changes, eliminating the performance bottleneck common in large logistics dashboards.

### 3. Key Outcomes and Impact 📈
The Astringer solution provides a direct return on investment through:
* **Proactive Incident Response:** Identifying a **Degraded** or **Offline** service (e.g., Customer API) within minutes, rather than hours.
* **Improved Efficiency:** Enabling quick filtering and searching across active shipments without hitting the server repeatedly, thanks to the powerful **RxJS pipeline** built into the dashboard component.
* **Enhanced Decision Making:** Providing core performance metrics on the front page, allowing managers to instantly spot trends and address hotspots.

***

## 💡 Case Study: Courier Tracking Dashboard (Original Summary)

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


Astringer/ ├── backend/                      # Node.js/Express API (Sensitive data lives here) │   ├── node_modules/            # 🔒 Protected by .gitignore │   ├── package.json │   └── server.js                # Main Express server and API routes ├── frontend/                    # Angular Application │   ├── src/ │   │   ├── app/ │   │   │   ├── app.component.* │   │   │   ├── dashboard/       # New component with enhanced features │   │   │   └── core/services/shipment.service.ts  # Handles communication with the backend │   │   └── ...                  # Other Angular files │   └── angular.json ├── .gitignore                   # Protects node_modules and sensitive backend files └── README.md


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
```

### 2. Install Dependencies

Since this is a monorepo, you must install dependencies for both the backend and frontend separately.

Backend Setup (Node.js/Express)

```
Bash
cd backend/
npm install

```

### Frontend Setup (Angular)

```
Bash

cd ../frontend/
npm install

```

### 3. Run the Application

The frontend relies on the backend API being available. You must start the two applications in separate terminal windows.

Start the Backend API (Terminal 1)

```
The API will run on http://localhost:3000.
Bash

cd Astringer/backend/
node server.js
 Output: Server listening on port 3000
 ```

Start the Angular Frontend (Terminal 2)

The frontend will automatically proxy API calls and run on http://localhost:4200.

```
Bash

cd Astringer/frontend/
ng serve
# Output: Angular Live Development Server is listening on localhost:4200

```
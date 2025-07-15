
# ShopVerse – Angular Frontend for E-Commerce Platform

This is the frontend of **ShopVerse**, a secure, responsive e-commerce web application developed using **Angular 10.1.4**. It provides a complete user and admin interface for managing products, placing orders, viewing cart items, and handling authentication—all connected via RESTful APIs.

---

## 🔧 Tech Stack

- **Framework:** Angular 10.1.4
- **Routing:** Angular Router
- **Authentication:** JWT-based (role-based access control)
- **HTTP Communication:** Angular HttpClient
- **UI Management:** Component-based modular architecture
- **State Handling:** Service-based data sharing
- **Testing:** Karma, Jasmine

---

## 🚀 Angular Functionalities

### 🔐 Authentication & Authorization
- User registration and login using JWT
- Role-based access for Admin and User
- Route protection using Auth Interceptors and Guards
- Forbidden page for unauthorized access

### 🛒 E-Commerce Features
- **Product Management (Admin Only):**
  - Add, edit, delete products
  - Upload product images
  - View all products with CRUD support
- **Shopping & Order Flow:**
  - Browse product list and view product details
  - Add/remove products to/from cart
  - Place an order from the cart
  - View current and past orders
  - Track order status (e.g., Placed, Delivered)
- **Cart Management:**
  - Item quantity update and removal
  - Price summary and checkout workflow

### 📦 Modular Components
- `add-new-product/` – Add/edit product module
- `cart/` – Cart view and logic
- `place-order/` – Order placement UI
- `order-details/` – Track specific order
- `my-orders/` – View past orders
- `product-view-details/` – Product detail page
- `login/`, `register/`, `header/`, `home/` – Core navigation and auth UI
- `admin/` – Admin dashboard
- `forbidden/` – Access denied handler

### 📋 UI Features
- Responsive layout and navigation
- Error handling and feedback messages
- Form validation for all inputs
- Dynamic component routing with `app-routing.module.ts`

---

## 📁 Directory Overview

```bash
src/app/
├── admin/
├── cart/
├── add-new-product/
├── login/
├── register/
├── home/
├── product-view-details/
├── place-order/
├── order-details/
├── my-orders/
├── user/
├── forbidden/
├── _services/
├── _model/
├── app.module.ts
├── app-routing.module.ts
└── app.component.*
```

---

## 🧪 Development & Testing

- Run the app: `ng serve`
- Build: `ng build --prod`
- Unit Tests: `ng test`
- E2E Tests: `ng e2e`

---

## 🌐 API Communication

All frontend operations are powered via **RESTful APIs** built with Spring Boot and connected to a MySQL backend.

---

## 📌 Notes

- JWT token is stored securely for session handling
- Admin and user experiences are separated via role-based views
- Uses Angular best practices including lazy loading, services, and guards

---


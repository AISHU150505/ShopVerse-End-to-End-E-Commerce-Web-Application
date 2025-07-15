
# ShopVerse – Full-Stack E-Commerce Web Application

**ShopVerse** is a secure and scalable full-stack e-commerce web application built with **Angular**, **Spring Boot**, and **MySQL**. It supports user authentication, product catalog management, cart functionality, order placement, and role-based admin controls. The project follows industry-standard practices including **JWT authentication**, **RESTful APIs**, **MVC architecture**, and modular UI components.


## Tech Stack

- **Frontend:** Angular 10.1.4
- **Backend:** Spring Boot (Java)
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Architecture:** MVC (Model-View-Controller)
- **Build Tools:** Angular CLI, Maven
- **Communication:** RESTful APIs


## Authentication & Security

- JWT-based authentication and session handling
- Role-based access control for users and admins
- Angular route protection (AuthGuard + Interceptors)
- Backend request filtering via Spring Security


## Core Functionalities

### User Features
- Register and log in securely
- Browse product listings and view detailed descriptions
- Add/remove items to/from cart
- Place orders and track their status (e.g., Placed, Delivered)
- View order history

### Admin Features
- Add, update, and delete products (CRUD)
- Upload product images
- View and update order statuses for all users

### Frontend Modules
- `add-new-product/` – Product creation/editing
- `cart/` – Cart and pricing logic
- `place-order/`, `order-details/`, `my-orders/` – Order processing and tracking
- `product-view-details/` – View individual product
- `login/`, `register/`, `home/`, `admin/`, `forbidden/`, `header/` – Auth and UI

### 🔧 Backend Modules
- **Config:** JWT filter, security setup, CORS config
- **Controller:** Product, Cart, Order, User, Role, Auth
- **Service Layer:** Business logic for all modules
- **Entity Layer:** Models like User, Product, Cart, Order, Role
- **DAO Layer:** Spring Data JPA repositories


## 🌐 API Overview (Spring Boot)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/authenticate` | POST | Login and receive JWT |
| `/register` | POST | Register a new user |
| `/products` | GET/POST/PUT/DELETE | Product management |
| `/cart` | GET/POST/DELETE | Cart operations |
| `/order` | GET/POST/PUT | Place and manage orders |


## 🧪 Development & Run

### Frontend (Angular)
```bash
cd frontend
npm install
ng serve
# Navigate to http://localhost:4200/
```

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080/
```

### MySQL Configuration (`application.properties`)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shopverse_db
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
```

## Project Structure

### Frontend (Angular)
```
src/app/
├── admin/
├── cart/
├── add-new-product/
├── order-details/
├── place-order/
├── product-view-details/
├── user/
├── _services/
├── _model/
└── app.module.ts
```

### Backend (Spring Boot)
```
src/main/java/com/youtube/ecommerce/
├── config/
├── controller/
├── dao/
├── entity/
├── service/
├── util/
└── EcommerceApplication.java
```


## Highlights

- Full-stack implementation with seamless integration
- Secure login, role-based control, and tokenized sessions
- Admin dashboard with product and order control
- REST API communication between Angular and Spring Boot
- Scalable architecture and modular codebase


## Future Enhancements

- Payment gateway integration (e.g., Razorpay, Stripe)
- Product reviews and ratings
- Email notifications for order updates
- Dockerized deployment and CI/CD setup





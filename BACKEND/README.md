
# ShopVerse – Spring Boot Backend for E-Commerce Platform

This is the backend service for **ShopVerse**, a secure, full-stack e-commerce application. Built using **Spring Boot**, the application handles user authentication, product and cart management, and order processing. The backend exposes **RESTful APIs** consumed by an Angular frontend, and stores data securely in a **MySQL** database.


## Tech Stack

- **Backend Framework:** Spring Boot
- **Security:** Spring Security with JWT
- **Database:** MySQL
- **ORM:** Spring Data JPA (Hibernate)
- **Architecture:** Layered (Controller, Service, DAO, Entity)
- **Build Tool:** Maven
- **Utilities:** JWT Token handling, CORS configuration, exception handling


## Authentication & Security

- Implements **JWT-based login & token validation**
- **Role-based access control** for Admin and User
- Custom `JwtFilter`, `JwtAuthenticationEntryPoint`, and `WebSecurityConfiguration`
- CORS enabled via global configuration


## Main Modules

### Config
- `WebSecurityConfiguration`, `JwtRequestFilter`, `JwtAuthenticationEntryPoint`, `CorsConfiguration`

### Controller
- `JwtController` – Handles login and token generation
- `UserController` – User registration and retrieval
- `ProductController` – CRUD operations for products
- `CartController` – Add, view, delete cart items
- `OrderDetailController` – Place and track orders
- `RoleController` – Role-based access endpoints

### DAO
- Interfaces: `UserDao`, `ProductDao`, `CartDao`, `OrderDetailDao`, `RoleDao`

### Entity
- Models: `User`, `Product`, `Cart`, `OrderDetail`, `OrderInput`, `OrderProductQuantity`, `Role`, `ImageModel`, `JwtRequest`, `JwtResponse`

### Service
- Services: `UserService`, `ProductService`, `CartService`, `OrderDetailService`, `JwtService`, `RoleService`


## API Overview

- `POST /authenticate` – Login and get JWT token
- `POST /register` – Register new user
- `GET /products`, `POST /products`, `PUT /products/{id}`, `DELETE /products/{id}`
- `POST /cart/add`, `GET /cart`, `DELETE /cart/{id}`
- `POST /order/place`, `GET /order`, `PUT /order/status/{id}`


## Configuration

- Set database and port in `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shopverse_db
spring.datasource.username=root
spring.datasource.password=your_password
server.port=8080
jwt.secret=your_jwt_secret
```


## Run & Build

- Run: `./mvnw spring-boot:run`
- Build: `./mvnw clean package`


## Features

- Secure login system with token-based authentication
- Admin-only product management (CRUD with image upload)
- User-level cart and order management
- Order status tracking (Placed/Delivered)
- Robust data persistence via JPA and MySQL
- Modular service-oriented structure


## Project Structure Snapshot

```bash
src/main/java/com/youtube/ecommerce
├── config/
├── controller/
├── dao/
├── entity/
├── service/
├── util/
└── EcommerceApplication.java
```


Let me know if you'd like Swagger/OpenAPI docs or Postman collection setup included.

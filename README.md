# 🎬 Movie API - Clean Architecture with NestJS

This project is a fully testable, production-ready RESTful Movie API built with NestJS, showcasing design best practices and alignment with [12-Factor App](https://12factor.net/) principles.

---

## ✅ Design Overview

### 🔁 Extensible Endpoint Structure

* Modularized structure (`movies`, `ratings`, `auth`) allows easy feature scaling.
* Each module contains `Controller`, `Service`, and `Repository` layers following NestJS domain separation.
* Adding a new domain (e.g. `/actors`) only requires a new module without touching existing code.

### 📐 Design Patterns Applied

* **Repository Pattern**: Encapsulates data access (`movies.repository.ts`, `ratings.repository.ts`).
* **Service Layer Pattern**: Business logic resides in `*.service.ts`, separating concerns from controllers.
* **DTOs (Data Transfer Objects)**: Clean API contract using `class-validator` and Swagger decorators.
* **Middleware Pattern**: Custom middleware like `LoggingMiddleware` applied globally.
* **Guard Pattern**: Authentication using `JwtAuthGuard`, implemented with Passport strategy.

---

## 🧪 Testability

* **Unit Tests**: Services, Repositories, Controllers are tested independently using Jest and mocked dependencies.
* **E2E Tests**: `/movies` and `/movies/:id` are verified using `supertest` and real HTTP calls.
* **Coverage**: Jest supports coverage reporting; `test:e2e` and `test` scripts included.

### 🧪 Example:

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## ⚙️ Configurability & 12-Factor Compliance

### 1. **Codebase**

* Tracked via Git. Shared across environments.

### 2. **Dependencies**

* All via `package.json`, no global installs.

### 3. **Config via Environment**

* Config managed using `.env` and `@nestjs/config`.

```bash
PORT=3000
JWT_SECRET=mysecret
USERNAME=admin
MOVIES_DB_PATH=./db/movies.db
RATINGS_DB_PATH=./db/ratings.db
```

### 4. **Backing Services**

* DBs (SQLite) are loosely coupled via `RatingsDbService` and `MoviesDbService`.

### 5. **Build, Release, Run**

* Dockerized with clean separation:

```dockerfile
FROM node:22-slim
# Install native deps, build, and run
```

### 6. **Processes**

* Stateless service, horizontally scalable.

### 7. **Port Binding**

* `app.listen(process.env.PORT || 3000)`

### 8. **Concurrency**

* Scalable using multiple containers or Node.js clustering.

### 9. **Disposability**

* Fast startup/shutdown due to NestJS + SQLite.

### 10. **Dev/Prod Parity**

* Same `.env`, same DB structure used in all environments.

### 11. **Logs**

* Centralized logging via `Logger` in middleware.

### 12. **Admin Processes**

* Seed or debug endpoints can be plugged in under separate module.

---

## 📚 API Endpoints

### 🎬 Movies

* `GET /movies?page=1` — List all movies with pagination
* `GET /movies/:id` — Get movie details by ID
* `GET /movies/year/:year?page=1&order=asc` — Filter movies by year
* `GET /movies/genre/:genre?page=1` — Filter movies by genre

### 🔐 Auth

* `POST /auth/login` — Get JWT token by username (from `.env`)

### 🩺 Health

* `GET /health` — Health check endpoint

---

## 🧭 Swagger API Docs

Auto-generated docs available at: `http://localhost:3000/docs`

---

## 🐳 Docker

Build & Run:

```bash
docker build -t movie-api .
docker run -p 3000:3000 --env-file .env movie-api
```

Or using docker-compose:

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
```

---

## 📦 Tech Stack

* **NestJS**: Framework
* **SQLite3**: Embedded DB (via Knex)
* **Jest**: Testing
* **Swagger**: API Docs
* **Passport/JWT**: Auth

---

## ✍️ Author

- Author - **[Tony Le]** (https://www.linkedin.com/in/tony-le-8446b276/)

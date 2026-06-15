# OutFitMe Project Audit

## Current Stack

### Frontend
* React
* TypeScript
* Vite
* Redux Toolkit
* CSS Modules / CSS
* React Router
* Tests already exist

### Backend
* Koa
* JavaScript
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Tests already exist

## Main Refactor Goals
1. Migrate backend from Koa to Express
2. Improve environment variable handling
3. Refactor authentication and authorisation
4. Protect private routes
5. Improve API design and error handling
6. Improve frontend API services
7. Strengthen TypeScript usage
8. Improve naming conventions and project structure
9. Improve README and project storytelling
10. Add or improve tests
11. Prepare for deployment
12. Add CI/CD pipeline

## Notes
This branch is for auditing and planning only.

---

## Package Audit

### Backend Dependencies
Current backend uses Koa:
* koa
* @koa/router
* @koa/cors
* koa-bodyparser

Planned migration:
* Remove Koa dependencies
* Add Express
* Add cors
* Add nodemon for local development

Potential later additions:
* cookie-parser
* express-validator or zod
* helmet
* morgan

### Frontend Dependencies

Frontend already uses:
* React
* TypeScript
* Vite
* Redux Toolkit
* React Router
* Vitest
* React Testing Library

Frontend clean-up notes:
* Rename package from `client--` to `outfitme-client`
* Review duplicated Cloudinary packages
* Review API services
* Improve TypeScript coverage

---

## Backend Route Audit

### Authentication Routes

Current routes:
* POST /register
* POST /login
* GET /profile
* DELETE /profile/delete/:id
* PUT /profile/update/:id
* GET /favorites
* PUT /favorites/add/:id
* PUT /favorites/remove/:id
* GET /logout

Issues:
* Profile delete route is not protected.
* Profile update route is not protected.
* Favourite routes are empty in the controller.
* Authentication uses `SECRET_KEY` but middleware uses `JWT_SECRET`.
* Tokens are returned in the response body and also stored in cookies.
* JWTs do not currently have an expiry.
* Input validation is missing.
* Route naming is inconsistent.
* Authorisation checks are missing for profile updates and deletes.

### Clothing Item Routes

Current routes:
* POST /upload
* GET /getRandomItem/:item/:tempToday/:rainToday
* GET /getAllItems/:item
* GET /test

Issues:
* Upload route is not protected.
* Clothing items are not linked to a user.
* Request body is trusted directly.
* getRandomItem should handle no matching items cleanly.
* getAllItems uses incorrect empty array comparison.
* Route names are not REST-style.
* /test route should become a proper health check or be removed.

---

## Naming and Structure Audit

### Current Naming

Current files:
* user.models.js
* image.models.js
* auth.controllers.js
* image.controllers.js
* auth.route.js
* images.route.js
* utils/authUser.js
* dbconnect.js

### Planned Naming

Planned files:
* models/user.model.js
* models/clothingItem.model.js
* controllers/auth.controller.js
* controllers/clothingItem.controller.js
* routes/auth.routes.js
* routes/clothingItem.routes.js
* middleware/auth.middleware.js
* config/db.js

### Naming Improvements
* Use singular file names for one model or controller module.
* Use plural `routes` because route files contain multiple route definitions.
* Use `middleware` for request middleware instead of `utils`.
* Rename `Image` model to `ClothingItem` because the database stores clothing metadata rather than images alone.
* Keep database connection logic separate from model definitions.

### Future Folder Structure

server/
* config/
  * db.js
* controllers/
  * auth.controller.js
  * clothingItem.controller.js
* middleware/
  * auth.middleware.js
* models/
  * user.model.js
  * clothingItem.model.js
* routes/
  * auth.routes.js
  * clothingItem.routes.js
* app.js
* server.js
client/
* components/
* pages/
* services/
* store/
* types/
* utils/

### Benefits
* Easier navigation.
* Consistent naming conventions.
* Easier onboarding for other developers.
* Better separation of concerns.
* More aligned with industry-standard Express applications.

---

## Test Audit

### Current Testing Setup
Backend currently uses:
- Jest
- Supertest

Frontend currently uses:
- Vitest
- React Testing Library

### Backend Test Issues
- Tests are currently written for the Koa app.
- Supertest uses `app.listen()`, which is Koa-specific in this project.
- Some route tests call incomplete URLs.
- `GET /getAllItems` is tested without the required `:item` param.
- `GET /getRandomItem` is tested without the required `:item`, `:tempToday`, and `:rainToday` params.
- Tests mostly check status codes rather than response bodies or database behaviour.
- Profile route test is commented out.
- Auth tests depend on database state.

### Planned Testing Improvements
- Update tests to work with Express using `request(app)`.
- Add proper auth tests for register, login, logout, and profile.
- Add protected route tests.
- Add clothing item route tests.
- Add validation error tests.
- Add ownership/authorisation tests.
- Use test database setup and teardown more deliberately.
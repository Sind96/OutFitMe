# OutFitMe Project Audit

## Current Stack

### Frontend
- React
- TypeScript
- Vite
- Redux Toolkit
- CSS Modules / CSS
- React Router
- Tests already exist

### Backend
- Koa
- JavaScript
- MongoDB
- Mongoose
- JWT auth
- bcrypt
- Tests already exist

## Main Refactor Goals
1. Migrate backend from Koa to Express
2. Improve environment variable handling
3. Refactor authentication
4. Protect private routes
5. Improve API error handling
6. Improve frontend API services
7. Strengthen TypeScript usage
8. Improve README and project storytelling
9. Add or improve tests
10. Prepare for deployment

## Notes
This branch is for auditing and planning only.

## Package Audit

### Backend dependencies
Current backend uses Koa:
- koa
- @koa/router
- @koa/cors
- koa-bodyparser

Planned migration:
- Remove Koa dependencies
- Add Express
- Add cors
- Add nodemon for local development

Potential later additions:
- cookie-parser
- express-validator or zod
- helmet
- morgan

### Frontend dependencies
Frontend already uses:
- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Vitest
- React Testing Library

Frontend clean-up notes:
- Rename package from `client--` to `outfitme-client`
- Review duplicated Cloudinary packages
- Review API services
- Improve TypeScript coverage

## Backend Route Audit

### Auth routes
Current routes:
- POST /register
- POST /login
- GET /profile
- DELETE /profile/delete/:id
- PUT /profile/update/:id
- GET /favorites
- PUT /favorites/add/:id
- PUT /favorites/remove/:id
- GET /logout

Issues:
- Profile delete route is not protected.
- Profile update route is not protected.
- Favourite routes are empty in the controller.
- Auth uses SECRET_KEY but middleware may use JWT_SECRET.
- Tokens are returned in response body and also stored in cookies.
- JWTs do not currently have an expiry.
- Input validation is missing.

### Image routes
Current routes:
- POST /upload
- GET /getRandomItem/:item/:tempToday/:rainToday
- GET /getAllItems/:item
- GET /test

Issues:
- Upload route is not protected.
- Image records are not linked to a user.
- Request body is trusted directly.
- getRandomItem should handle no matching items cleanly.
- getAllItems uses incorrect empty array comparison.
- Route names are not REST-style.
- /test route should become a proper health check or be removed.
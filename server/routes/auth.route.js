// Init Router
const Router = require('@koa/router');
const router = new Router();
const auth = require('../controllers/auth.controller');
const { model } = require('mongoose');

//User routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.delete('/profile/delete/:id', deleteProfile);
router.put('/profile/update/:id', updateProfile);
router.get('/favorites', getFavorites);
router.put('/favorites/add/:id', addFavorite);
router.put('/favorites/remove/:id', removeFavorite);
router.get('/logout', logout);

model.exports = router;
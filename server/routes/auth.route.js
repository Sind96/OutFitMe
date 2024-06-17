// Init Router
const Router = require('@koa/router');
const router = new Router();
const auth = require('../controllers/auth.controllers');


//User routes
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/profile', auth.profile);
router.delete('/profile/delete/:id', auth.deleteProfile);
router.put('/profile/update/:id', auth.updateProfile);
router.get('/favorites', auth.getFavorites);
router.put('/favorites/add/:id', auth.addFavorite);
router.put('/favorites/remove/:id', auth.removeFavorite);
router.get('/logout', auth.logout);

module.exports = router;
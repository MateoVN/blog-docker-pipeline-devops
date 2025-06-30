const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/user.controller');

// Ruta para obtener el perfil del usuario (puedes agregar más rutas según sea necesario)
router.get('/profile', getProfile);
module.exports = router;
//obtener ruta  de perfil de usuario

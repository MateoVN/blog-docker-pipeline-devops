
const User = require('../models/user');

exports.getProfile = async (req, res) => {
    // Para este ejemplo, simplemente renderizaremos una vista de perfil
    // En una aplicación real, deberías obtener el usuario autenticado de una sesión o token
    const username = 'Usuario de Ejemplo'; // Esto debería ser dinámico según el usuario autenticado
    res.render('users/profile', { username });
};
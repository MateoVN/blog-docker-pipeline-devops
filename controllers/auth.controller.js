const User = require('../models/user'); // Importa el modelo de usuario
const bcrypt = require('bcrypt');

// Controlador para mostrar el formulario de registro
exports.showRegisterForm = (req, res) => {
  res.render('auth/register'); // Renderiza la vista register.pug
};

// Controlador para manejar el registro de usuario
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña
    const user = new User({ username, password: hashedPassword }); // Crea un nuevo usuario con la contraseña encriptada
    await user.save(); // Guarda el usuario en la base de datos
    res.redirect('/auth/login'); // Redirige al formulario de inicio de sesión después del registro
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(400).send('Error al registrar usuario');
  }
};

// Controlador para mostrar el formulario de inicio de sesión
exports.showLoginForm = (req, res) => {
  res.render('auth/login'); // Renderiza la vista login.pug
};

// Controlador para manejar el inicio de sesión
exports.login = async (req, res) => {
  const { username, password } = req.body; // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud
  if (!username || !password) { // Verifica si los campos están vacíos
    req.session.error_msg = 'Por favor, complete todos los campos'; // Almacena el mensaje de error en la sesión
    return res.redirect('/auth/login'); // Redirige al formulario de inicio de sesión
  }
  try {
    const user = await User.findOne({ username }); // Busca el usuario por nombre de usuario
    if (!user || !(await user.comparePassword(password))) { // Verifica si el usuario no existe o la contraseña es incorrecta
      req.session.error_msg = 'Nombre de usuario o contraseña incorrectos'; // Almacena el mensaje de error en la sesión
      return res.redirect('/auth/login'); // Redirige al formulario de inicio de sesión
    }
    req.session.userId = user._id; // Almacena el ID del usuario en la sesión
    console.log('ID del usuario almacenado en la sesión:', req.session.userId);
    req.session.success_msg = 'Inicio de sesión exitoso'; // Almacena el mensaje de éxito en la sesión
    res.redirect('/posts/all-post'); // Redirige a la vista de todas las publicaciones
  } catch (error) {
    req.session.error_msg = 'Error al iniciar sesión'; // Almacena el mensaje de error en la sesión
    res.redirect('/auth/login'); // Redirige al formulario de inicio de sesión
  }
};

// Controlador para manejar el cierre de sesión
exports.logout = (req, res) => {
  req.session.destroy(); // Destruye la sesión
  res.redirect('/auth/login'); // Redirige al formulario de inicio de sesión
};
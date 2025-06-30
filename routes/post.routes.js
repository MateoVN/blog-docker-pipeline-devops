const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authController = require('../controllers/auth.controller'); // Importa el controlador de autenticación


// Ruta para listar todas las publicaciones
router.get('/all-post', postController.listAllPosts);

// Ruta para mostrar el formulario de creación de publicaciones
router.get('/create-post', postController.showCreatePostForm);

// Ruta para crear una nueva publicación
router.post('/create-post', postController.createPost);

// Ruta para mostrar el formulario de edición de publicaciones
router.get('/:id/edit', postController.showEditPostForm);

// Ruta para actualizar una publicación
router.post('/:id/edit', postController.updatePost);

// Ruta para eliminar una publicación
router.post('/:id/delete', postController.deletePost);
// Ruta para agregar un comentario a una publicación (protegida)
router.post('/:id/comment', postController.addComment);

// Ruta para los comentarios del filtrado por category
router.post('/:id/comment/category', postController.addCommentCategory);

// Ruta para buscar publicaciones
router.get('/search', postController.searchPosts);

router.get('/:id', postController.getPostById);

module.exports = router;
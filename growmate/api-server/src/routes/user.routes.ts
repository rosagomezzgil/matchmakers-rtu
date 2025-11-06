import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller'; 

const router = express.Router();

// Ruta para crear un usuario (registro)
router.post('/signup', createUser);

// Ruta para hacer login (acceder)
router.post('/login', loginUser);

export default router; // Asegúrate de exportar el router

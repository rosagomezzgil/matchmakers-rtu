// User routes: manage the register (signup), login and visualization of information of the user

import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller'; 

const router = express.Router();

// Route to create an user (register)
router.post('/signup', createUser);

// Route to signup an user (login)
router.post('/login', loginUser);

export default router;
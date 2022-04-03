import express from 'express';
const router = express.Router();


import {agregarTarea, obtenerTarea, actualizarTarea, eliminarTarea, cambiarEstado} from '../controllers/tareasController.js';
import checkAuth from '../middleware/checkAuth.js';

router.post('/agregar', checkAuth, agregarTarea);
router.route('/:id').get(checkAuth, obtenerTarea).put(checkAuth, actualizarTarea).delete(checkAuth, eliminarTarea);
router.post('/estado/:id', checkAuth, cambiarEstado)

export default router;
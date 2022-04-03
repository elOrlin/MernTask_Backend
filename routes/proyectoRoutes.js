import express  from "express";
const router = express.Router();

import { 
    obtenerProyectos, 
    nuevoProyecto, 
    obtenerProyecto, 
    editarProyecto, 
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador, 
    eliminarColaborador,
} from '../controllers/proyectoController.js';
import checkAuth from "../middleware/checkAuth.js";

router.get('/obtener-proyectos', checkAuth, obtenerProyectos)
router.post("/crear-proyectos", checkAuth, nuevoProyecto);

router.route('/proyectos/:id').get(checkAuth, obtenerProyecto).put(checkAuth, editarProyecto).delete(checkAuth, eliminarProyecto);

router.post('/nuevo-colaborador', checkAuth, buscarColaborador)
router.post('/colaboradores/:id', checkAuth, agregarColaborador);
router.post('/eliminar-colaboradores/:id', checkAuth, eliminarColaborador);

export default router;
import express  from "express";
const router = express.Router();

import {registrar, autenticar, confirmar,  olvidarPassword, comprobarToken, nuevoPassword, perfil} from '../controllers/usuarioController';

//middleware
import checkAuth from "../middleware/checkAuth.js";

router.post("/usuarios", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidarPassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get('/perfil', checkAuth, perfil);

export default router;
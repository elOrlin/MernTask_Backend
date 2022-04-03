import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import {emailRegistro, emailOlvidePassword } from "../helpers/emails.js";

//crear cuenta y almacenar en la BD
const registrar = async (req, res) => {
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email})

    if(existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({mensaje: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId()
        await usuario.save();
        
        emailRegistro({
            email: usuario.eamil,
            nombre: usuario.nombre,
            token: usuario.token
        })
        return res.status(200).json({mensaje: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta"});

    } catch (error) {
        console.log(error)
    }
}

//autenticar el usuario ya Registrado
const autenticar = async (req, res) => {
    const { email, password } = req.body;
  
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      const error = new Error("El Usuario no existe");
      return res.status(404).json({ mensaje: error.message });
    }
  
    // Comprobar si el usuario esta confirmado
    if (usuario.confirmado) {
      const error = new Error("Tu Cuenta no ha sido confirmada");
      return res.status(403).json({ mensaje: error.message });
    }
  
    // Comprobar su password
    if (await usuario.comprobarPassword(password)) {
     res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario._id),
        mensaje: 'Usuario Logueado Correctamente'
      });

    } else {
      const error = new Error("El Password es Incorrecto");
      return res.status(403).json({ mensaje: error.message });
    }
    
  };

const confirmar = async (req, res) => {
    const {token} = req.params;
  
    const confirmar = await Usuario.findOne({token});
  
    if(!confirmar) {
      const error = new Error("Token no valido");
      return res.status(404).json({mensaje: error.message});
    }
  
    try {
        confirmar.confirmado = true;
        confirmar.token = "";
        await confirmar.save();
       return res.json({mensaje: 'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(error)
    }
  
    return res.status(200).json('Token valido')
  }

  const olvidarPassword = async (req, res) => {
    const {email} = req.body;

    const usuario = await Usuario.findOne({email});

    if(!usuario) {
        const error = new Error("El Usuario no existe");
        return res.status(404).json({mensaje: error.message});
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        emailOlvidePassword({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })
        res.json({mensaje: "Hemos Enviado Un email Con Sus Credenciales "})
    } catch (error) {
        console.log(error)
    }
 
 }
 
 const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const tokenValido = await Usuario.findOne({token});

    if(tokenValido) {
        res.json({mensaje: 'Token valido y Usuario existente'})
    }else {
        res.json({mensaje: 'Token no valido y Usuario no existente'})
    }
 }
 
 const nuevoPassword = async (req, res) => {
     const {token} = req.params;
     const {password} = req.body;

     const usuario = await Usuario.findOne({token});

     if(usuario) {
        usuario.password = password;
        usuario.token = ""

        try {
            await usuario.save();
            res.json({mensaje: "Password Modificado Correctamente"});
        } catch (error) {
            console.log(error)
        }
     }else {
        const error = new Error("El Password No Ha Sido Modificado");
        return res.status(404).json({mensaje: error.message});
     }
 }

const perfil = async (req, res) => {
    const {usuario} = req;

    res.json(usuario)
}


export { registrar, autenticar, confirmar, olvidarPassword, comprobarToken, nuevoPassword, perfil};






















/*
   //crear cuenta y almacenar en la BD
const registrar = async (req, res) => {
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email})

    if(existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(404).json({mensaje: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save();
        return res.status(200).json(usuarioAlmacenado);

    } catch (error) {
        console.log(error)
        return res.status(404).json({mensaje: "Hubo un Error, Intente mas tarde..."});
    }
}

//autenticar el usuario ya Registrado
const autenticar = async (req, res) => {
    const {email, password} = req.body;

    const usuario = await Usuario.findOne({email});

    //comprobar si no usuario existe
    if(!usuario){
        const error = new Error("El Usuario No Existe");
        return res.status(404).json({mensaje: error.message});
    }

    //comprobar si el usuario no esta confirmado
    if(!usuario.confirmado){
        const error = new Error("El Usuario No Ha Confirmado Su Cuenta");
       return res.status(404).json({mensaje: error.message});
    }

    //comprobar si el password existe
    if(await usuario.comprobarPassword(password)) {
       return res.status(200).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error("El Password es Incorrecto");
        return res.status(403).json({mensaje: error.message});
    }
}

const confirmar = async (req, res) => {
  const {token} = req.params;

  const confirmar = await Usuario.findOne({token});

  if(!confirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({mensaje: error.message});
  }

  try {
      confirmar.confirmado = true;
      confirmar.token = "";
      await confirmar.save();
  } catch (error) {
      console.log(error)
  }

  res.status(200).json('Token valido')
}

const olvidarPassword = async (req, res) => {
    const {email} = req.body;

    const usuario = await Usuario.findOne({email});

    if(!usuario) {
        const error = new Error("El Usuario no existe");
        return res.status(404).json({mensaje: error.message});
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({mensaje: "Hemos Enviado Un email Con Sus Credenciales "})
    } catch (error) {
        console.log(error)
    }
 
 }
 
 const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const tokenValido = await Usuario.findOne({token});

    if(tokenValido) {
        res.json('Token valido y Usuario existente')
    }else {
        res.json('Token no valido y Usuario no existente')
    }
 }
 
 const nuevoPassword = async (req, res) => {
     const {token} = req.params;
     const {password} = req.body;

     const usuario = await Usuario.findOne({token});

     if(usuario) {
        usuario.password = password;
        usuario.token = ""

        try {
            await usuario.save();
            res.json({mensaje: "Password Modificado Correctamente"});
        } catch (error) {
            console.log(error)
        }
     }else {
        const error = new Error("El Password No Ha Sido Modificado");
        return res.status(404).json({mensaje: error.message});
     }
 }

const perfil = async (req, res) => {
    const {usuario} = req;

    res.json(usuario)
}

export { registrar, autenticar, confirmar, olvidarPassword, comprobarToken, nuevoPassword, perfil };
*/
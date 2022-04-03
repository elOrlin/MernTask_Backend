import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos;

  try {
    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
    auth: {
      user: "2c1758754e1f8f",
      pass: "b5be9d4f3538e7"
    }
    });;
      // Información del email
    
      await transport.sendMail({
        from: 'MernTask - Administrador de Proyectos" <merntaskdiaz@gmail.com>',
        to: email,
        subject: "MernTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en MernTask",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en MernTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`
      });
  } catch (error) {
    console.log(error)
  }
};

export const emailOlvidePassword = async (datos) => {
  const { nombre, email, token } = datos;

  try {
    let transport = nodemailer.createTransport({
       host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2c1758754e1f8f",
      pass: "b5be9d4f3538e7"
    }
  });;
    // Información del email
  
    await transport.sendMail({
      from: 'MernTask - Administrador de Proyectos" <merntaskdiaz@gmail.com>',
      to: email,
      subject: "MernTask - Comprueba tu cuenta",
      text: "Comprueba tu cuenta en MernTask",
      html: `<p>Hola: ${nombre} Comprueba tu cuenta en MernTask</p>
      <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Comprobar Cuenta</a>
      
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`,
    });
  } catch (error) {
    console.log(error)
  }

};

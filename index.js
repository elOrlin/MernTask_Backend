import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

//conectar a la base de datos
import conectarDB from './config/db.js';

//Rutas
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

app.use('/', usuarioRoutes);
app.use('/', proyectoRoutes);
app.use('/', tareaRoutes);

const PORT = process.env.PORT || 4000

 app.listen(PORT, () => {
    console.log(`Conectado al servidor ${PORT}`);
});

/*import {Server} from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on("connection", (socket) => {
  //console.log('Conectado a socket.io')

  socket.on('Abrir Proyecto' , (proyecto) => {
    socket.join(proyecto)
  })

  socket.on("nueva tarea", (tarea) => {
    const {proyecto} = tarea;
    socket.in(proyecto).emit("tarea agregada", tarea);
  });

  socket.on("eliminar tarea", (tarea) => {
    const {proyecto} = tarea;
    socket.to(proyecto).emit('tarea eliminada', tarea)
  })
})*/
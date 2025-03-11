const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', // Asegúrate que la IP y el puerto sean correctos
    methods: ['GET', 'POST'],
  },
});

// Configuración para servir archivos estáticos (videos)
app.use('/videos', express.static(path.join(__dirname, 'videos')));

const videos = [
  { id: 1, title: '5 minute timer', url: 'http://localhost:3000/videos/5-Minute-Timer.mp4' },
  { id: 2, title: '6 minute timer', url: 'http://localhost:3000/videos/6-Minute-Timer.mp4' },
];

const videoCodes = new Map();

io.on('connection', (socket) => {
  console.log('Un cliente conectado');


  socket.on('getVideos', () => {
    socket.emit('videoList', videos);
  });


  socket.on('selectVideo', (videoId) => {
    const code = Math.random().toString(36).substr(2, 4).toUpperCase();
    videoCodes.set(code, videoId);
    console.log(`Código generado para el video ${videoId}: ${code}`);
    socket.emit('generatedCode', code);
  });


  socket.on('validateCodeFromA2', (code) => {
    if (videoCodes.has(code)) {
      const videoId = videoCodes.get(code);
      const videoUrl = videos.find((v) => v.id === videoId).url;


      socket.emit('codeValid', { valid: true, videoUrl });


      io.emit('playVideo', { videoUrl });
    } else {
      socket.emit('codeValid', { valid: false });
    }
  });
});

// Iniciar servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

const videos = [
  { id: 1, title: 'Explorando el Espacio', url: 'YcB2POYMfW8' }, // ID de YouTube
  { id: 2, title: 'Cocinando con Estilo', url: '1adJvub3pJU' },  // ID de YouTube
];

const videoCodes = new Map(); // Mapeo de códigos generados a videos

io.on('connection', (socket) => {
  console.log('Un cliente conectado');

  // Enviar lista de videos al cliente
  socket.on('getVideos', () => {
    socket.emit('videoList', videos);
  });

  // Generar código para un video
  socket.on('selectVideo', (videoId) => {
    const code = Math.random().toString(36).substr(2, 4).toUpperCase();
    videoCodes.set(code, videoId);
    console.log(`Código generado para video ${videoId}: ${code}`);
    socket.emit('generatedCode', code);
  });

  // Validar código
  socket.on('validateCode', (code) => {
    if (videoCodes.has(code)) {
      const videoId = videoCodes.get(code);
      socket.emit('codeValid', { valid: true, videoId: videos.find(v => v.id === videoId).url });
    } else {
      socket.emit('codeValid', { valid: false });
    }
  });
});

// Iniciar servidor en puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

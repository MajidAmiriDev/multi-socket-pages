const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// سرو کردن فایل‌های استاتیک از پوشه public
app.use(express.static('public'));

// Namespace مخصوص page1
const page1Namespace = io.of('/page1');
page1Namespace.on('connection', (socket) => {
  console.log('User connected to page1 namespace:', socket.id);

  socket.on('message_from_page', (data) => {
    console.log(`Message from page1: ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from page1 namespace:', socket.id);
  });
});

// Namespace مخصوص page2
const page2Namespace = io.of('/page2');
page2Namespace.on('connection', (socket) => {
  console.log('User connected to page2 namespace:', socket.id);

  socket.on('message_from_page', (data) => {
    console.log(`Message from page2: ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from page2 namespace:', socket.id);
  });
});

// Namespace مخصوص page3
const page3Namespace = io.of('/page3');
page3Namespace.on('connection', (socket) => {
  console.log('User connected to page3 namespace:', socket.id);

  socket.on('message_from_page', (data) => {
    console.log(`Message from page3: ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from page3 namespace:', socket.id);
  });
});

// گلوبال namespace
const globalNamespace = io.of('/global');
globalNamespace.on('connection', (socket) => {
  console.log('User connected to global namespace:', socket.id);

  socket.on('global_message', (data) => {
    console.log(`Global message: ${data.message}`);
    // ارسال پیام به همه کلاینت‌ها
    globalNamespace.emit('global_broadcast', { message: data.message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from global namespace:', socket.id);
  });
});

// راه‌اندازی سرور بر روی پورت 3000
server.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});

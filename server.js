const lowdb = require('lowdb');
const express = require('express');
let socket = require('socket.io');
const FileSync = require('lowdb/adapters/FileSync')


const adapter = new FileSync('database.json')
const db = lowdb(adapter)
const app = express();
app.use(express.static('public'));
const routs = require('./modules/route');
routs(app , db);


//portal
let server = app.listen(3000);

//socket.io
let io= socket(server);

io.on('connection',function(socket){
    console.log('made a connection',socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});


console.log('Server Started!!!');

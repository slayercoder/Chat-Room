var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("Server running on port 3000");
});
users = [];
connections = [];
app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});
io.sockets.on('connection',function(socket){
    connections.push(socket);
    // console.log(sockets); //not required, just for demo
    // console.log(connections); // not required, just for demo
    console.log("Connected: %s sockets connected ",connections.length);

    //disconnect
    // socket.on('disconnect',function(){
    //     // users.splice(users.indexOf(socket.username),1);
    //     // console.log(users);
    //     // updateUsernames();
    //     // connections.splice(connections.indexOf(socket),1);
    //     // console.log("Disconnected: %s sockets disconnected",connections.length);
    //  });

     //send message
     socket.on('send message',function(data){
         
        io.sockets.emit('New message',{msg:data,user: socket.username});
     });
     // new user
     socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        // users.push(socket.username);
        // updateUsernames();
     });
// function updateUsernames(){
//     io.sockets.emit('get users',users);
// }

});

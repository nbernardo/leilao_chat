allUsers = {};

const express = require("express");
const path = require("path");
const cors = require("cors");
const users = require("./public/onlineUsers");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(express.static(path.join(__dirname,"public")));

app.set("views",path.join(__dirname,"public"));
app.set("view engine","pug");
app.engine("html",require("ejs").renderFile);

app.get("/teste",(req,res) => {
    users.dados(function(e,r){
        res.json(r);
    });
});


app.get("/conversation", (req,res) => {
    
    let partUsers = {receiver : req.query.other, sender: req.query.me};
    users.findConversation(partUsers,function(err,r){
        res.json(r);
    });

});


app.get("/", (req,res) => {
    res.render("index.html", {nome: "Primeiro"});
});


io.on("connection", sock => {

    sock.on("userConnected", (u) => {
        allUsers[u] = sock.id;
    });

    sock.on("message", payload => {
        
        users.saveMensagem(payload);
        sock.broadcast.to(allUsers[payload.receiver]).emit("message",payload);
        
    });

});



server.listen(3001);
const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"naka",
    password:"1234",
    database:"proshop"
});

connection.connect((err) => {
    if(err){
        console.log("Erro ao conectar a BD ",err);
        return;
    }
})

var users;

exports.dados = function(f){ 

    return connection.query("select * from user",f);

}


exports.saveMensagem = function({receiver,sender,message}){


    connection.query("INSERT INTO chatMessage (message,receiver,sender) VALUES (?,?,?)", [message,receiver,sender], function(err, res, flds){
        
        if(err)
            throw err;
        
    })

}

exports.findConversation = function({sender,receiver},f){

    let u1 = sender, u2 = receiver;

    return connection.query(`SELECT * FROM chatMessage 
                                WHERE (receiver = '${u1}' AND sender = '${u2}') 
                                OR (receiver = '${u2}' AND sender = '${u1}')  `,f);


}

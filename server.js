// =====================================
// BATTLE GAME SERVER
// TELEGRAM + API
// =====================================


const express = require("express");

const cors = require("cors");

const path = require("path");

const TelegramBot = require("node-telegram-bot-api");



const {


initDatabase,

getPlayer,

createPlayer,

getEggs,

addBalance,

buyEgg


} = require("./database");







const app = express();


app.use(cors());


app.use(express.json());





// =====================================
// STATIC
// =====================================


app.use(

express.static(

path.join(__dirname,"public")

)

);









// =====================================
// DATABASE
// =====================================


initDatabase();









// =====================================
// TELEGRAM BOT
// =====================================



const BOT_TOKEN = process.env.BOT_TOKEN;



let bot = null;





if(BOT_TOKEN){



bot = new TelegramBot(

BOT_TOKEN,

{

polling:true

}

);







bot.onText(

/\/start(.*)/,

(msg,match)=>{





let user = msg.from;



let ref = "";



if(match[1]){

ref = match[1].trim();

}








createPlayer(

{

id:String(user.id),

username:user.username,

first_name:user.first_name,

avatar:""

}


);








bot.sendMessage(

msg.chat.id,


"⚔️ Battle Game запущен\n\nВаш первый дракон SINNI уже получен"

);



});





}









// =====================================
// GET PLAYER
// =====================================


app.post(

"/player",

(req,res)=>{



let id = String(req.body.id);





getPlayer(

id,

(player)=>{



if(!player){


createPlayer(

{

id:id,

username:req.body.username,

first_name:req.body.first_name,

avatar:req.body.avatar


},


()=>{


getPlayer(

id,

(p)=>{


res.json({

success:true,

player:p

});


}


);



}


);



return;


}







res.json({

success:true,

player

});





}

);



}

);









// =====================================
// EGGS
// =====================================


app.post(

"/eggs",

(req,res)=>{



getEggs(

String(req.body.id),

(eggs)=>{



res.json({

success:true,

eggs

});


}


);



}

);









// =====================================
// BUY EGG
// =====================================


const EGGS = {


SINNI:{

price:10000,

income:0.001

},


BORLI:{

price:50000,

income:0.010

},


BONI:{

price:100000,

income:0.075

},


JOUNI:{

price:700000,

income:0.100

},


"SIXI LEGA":{

price:1300000,

income:5

}


};









app.post(

"/buy",

(req,res)=>{



let id = String(req.body.id);



let type=req.body.type;





let egg=EGGS[type];





if(!egg)

return res.json({

success:false,

message:"Яйцо не найдено"

});








getPlayer(

id,

(player)=>{



if(!player)

return res.json({

success:false

});








if(player.balance < egg.price)

return res.json({

success:false,

message:"Недостаточно средств"

});









player.balance -= egg.price;






buyEgg(

id,

type,

egg.price,

egg.income

);








res.json({

success:true,

balance:player.balance

});





}



);



}

);









// =====================================
// INCOME SYSTEM
// =====================================



setInterval(()=>{



db.all(

`

SELECT owner,SUM(income) as inc

FROM eggs

GROUP BY owner

`,

(rows)=>{





rows.forEach(row=>{



addBalance(

row.owner,

row.inc

);



});



}


);



},60000);











// =====================================
// SERVER
// =====================================



const PORT = process.env.PORT || 3000;



app.listen(

PORT,

()=>{


console.log(

"Battle Game started",

PORT

);


}

);

// =====================================
// BATTLE GAME SERVER v1
// Telegram + API + Eggs
// =====================================


const express = require("express");
const cors = require("cors");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");



const {

initDatabase,
getPlayer,
createPlayer,
updatePlayer,
getTopPlayers,
getRandomPlayer,
buyEgg,
sellEgg,
addIncome,
updateProfile,
createApiKey

} = require("./database");





const app = express();



app.use(cors());

app.use(express.json());





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
// CONFIG
// =====================================


const PORT =

process.env.PORT || 3000;



const BOT_TOKEN =

process.env.BOT_TOKEN;









// =====================================
// TELEGRAM BOT
// =====================================


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





let id =

String(msg.from.id);






let ref = null;







if(match[1]){

ref = match[1].trim();

}








createPlayer({

id:id,

username:

msg.from.username || "",


first_name:

msg.from.first_name || "",


avatar:"",


referrer:ref


});








bot.sendMessage(

msg.chat.id,

"⚔️ BATTLE GAME запущен"

);




});



}









// =====================================
// PLAYER LOAD
// =====================================


app.post(

"/player",

(req,res)=>{


let id =

String(req.body.id);







getPlayer(

id,

(player)=>{





if(!player){



createPlayer(

{


id:id,


username:req.body.username || "",


first_name:req.body.first_name || "",


avatar:req.body.avatar || "",


referrer:req.body.ref || null



},

()=>{


getPlayer(

id,

(newPlayer)=>{


res.json({

success:true,

player:newPlayer

});


}

);



}

);



return;



}








addIncome(

player,

()=>{



getPlayer(

id,

(updated)=>{


res.json({

success:true,

player:updated

});


}

);



}

);






});



}

);









// =====================================
// BUY EGG
// =====================================


app.post(

"/egg/buy",

(req,res)=>{



let id =

String(req.body.id);



let egg =

req.body.egg;






buyEgg(

id,

egg,

(result)=>{



res.json(result);



}

);



}

);
// =====================================
// SELL EGG
// =====================================


app.post(

"/egg/sell",

(req,res)=>{



let id =

String(req.body.id);



let egg =

req.body.egg;







sellEgg(

id,

egg,

(result)=>{


res.json(result);



}

);



}

);









// =====================================
// STEAL EGG
// =====================================


app.post(

"/egg/steal",

(req,res)=>{



let id =

String(req.body.id);








getRandomPlayer(

id,

(target)=>{





if(!target){



return res.json({

success:false,

message:"Нет игроков"

});



}








res.json({

success:true,

target:{

id:target.id,

username:target.username || "Игрок"

}


});





}

);



}

);









// =====================================
// COMPLETE STEAL
// =====================================


app.post(

"/egg/steal/confirm",

(req,res)=>{



let id =

String(req.body.id);




let target =

String(req.body.target);






let egg =

req.body.egg;







// логика списания и передачи яйца
// будет в database.js






res.json({

success:true,

message:"Яйцо украдено"

});





}

);









// =====================================
// RATING
// =====================================


app.post(

"/rating",

(req,res)=>{



getTopPlayers(

(players)=>{


res.json({

success:true,

players

});



}

);



}

);









// =====================================
// PROFILE UPDATE
// =====================================


app.post(

"/profile/update",

(req,res)=>{



let id =

String(req.body.id);






updateProfile(

id,

{

nickname:req.body.nickname,

color:req.body.color


},

(result)=>{


res.json(result);



}

);



}

);









// =====================================
// CREATE API KEY
// =====================================


app.post(

"/api/create",

(req,res)=>{



let id =

String(req.body.id);






createApiKey(

id,

(result)=>{



res.json(result);



}

);



}

);









// =====================================
// FREE EGG
// =====================================


app.post(

"/freeEgg",

(req,res)=>{



let id =

String(req.body.id);






getPlayer(

id,

(player)=>{



if(!player){



return res.json({

success:false

});



}






let now =

Date.now();







let last =

player.free_egg_time || 0;







let day =

24*60*60*1000;








if(now-last < day){



return res.json({

success:false,

message:"Ещё рано"

});



}







// выдаём SINNI



player.sinni += 1;





player.free_egg_time = now;






updatePlayer(

id,

player,

()=>{



res.json({

success:true,

egg:"SINNI"

});



}

);



});



}

);
// =====================================
// USER DATA
// =====================================


app.post(

"/profile",

(req,res)=>{


let id =

String(req.body.id);





getPlayer(

id,

(player)=>{



if(!player){



return res.json({

success:false

});



}





addIncome(

player,

()=>{



getPlayer(

id,

(updated)=>{


res.json({

success:true,

player:updated

});



}

);



}

);






}

);



}

);









// =====================================
// CHECK PLAYER LIST FOR STEAL
// =====================================


app.post(

"/players/random",

(req,res)=>{


let id =

String(req.body.id);






getRandomPlayer(

id,

(player)=>{



if(!player){



return res.json({

success:false

});



}







res.json({

success:true,

player:{


id:player.id,


nickname:

player.nickname || player.username || "Игрок",



avatar:

player.avatar || ""



}



});



}

);



}

);









// =====================================
// HEALTH CHECK
// =====================================


app.get(

"/",

(req,res)=>{


res.send(

"⚔️ BATTLE GAME SERVER ONLINE"

);



}

);









// =====================================
// ERROR HANDLER
// =====================================


app.use(

(err,req,res,next)=>{


console.log(

"SERVER ERROR",

err

);



res.status(500).json({

success:false,

message:"Server error"

});



}

);









// =====================================
// START SERVER
// =====================================


app.listen(

PORT,

()=>{


console.log(

"⚔️ Battle Game server started:",

PORT

);



}

);
// =====================================
// BATTLE GAME SERVER END
// =====================================


// защита от выключения
process.on(

"SIGINT",

()=>{


console.log(

"Server stopped"

);



process.exit();

}



);





process.on(

"uncaughtException",

(error)=>{


console.log(

"Critical error:",

error

);



}

);





process.on(

"unhandledRejection",

(error)=>{


console.log(

"Promise error:",

error

);



}
);

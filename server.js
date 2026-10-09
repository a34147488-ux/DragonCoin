// =====================================
// BATTLE GAME SERVER
// Telegram Mini App
// =====================================


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import TelegramBot from "node-telegram-bot-api";

import {
    initDatabase,
    getPlayer,
    createPlayer,
    addEgg,
    getEggs,
    updateBalance
} from "./database.js";

import { fileURLToPath } from "url";



dotenv.config();



const app = express();


app.use(cors());

app.use(express.json());



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





// =============================
// STATIC
// =============================


app.use(

express.static(

path.join(__dirname,"public")

)

);







// =============================
// DATABASE
// =============================


initDatabase();








// =============================
// TELEGRAM BOT
// =============================


const TOKEN = process.env.BOT_TOKEN;


let bot = null;



if(TOKEN){


bot = new TelegramBot(

TOKEN,

{
polling:true
}

);



bot.onText(

/\/start(.*)/,

(msg,match)=>{



const id = String(
msg.from.id
);



const ref = match[1]

?
match[1].trim()
:
null;






getPlayer(

id,

(player)=>{



if(!player){



createPlayer(

{

id:id,

username:
msg.from.username || "",

first_name:
msg.from.first_name || "",

ref:ref

},

()=>{


// первое яйцо

addEgg(

id,

"SINNI"

);



}

);



}




bot.sendMessage(

msg.chat.id,

"⚔️ Battle Game запущен"

);



}

);



}

);



}









// =============================
// CREATE / GET PLAYER
// =============================


app.post(

"/player",

(req,res)=>{


const data=req.body;



const id=String(data.id);






getPlayer(

id,

(player)=>{





if(player){



return res.json({

success:true,

player

});



}







createPlayer(

{

id,

username:data.username,

first_name:data.first_name,

avatar:data.avatar,

ref:data.ref

},

()=>{



addEgg(

id,

"SINNI"

);





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



}


);



}

);









// =============================
// GET EGGS
// =============================


app.post(

"/eggs",

(req,res)=>{


const id=String(
req.body.id
);



getEggs(

id,

(eggs)=>{


res.json({

success:true,

eggs

});


}

);



}

);









// =============================
// CLICK / INCOME UPDATE
// =============================


app.post(

"/balance",

(req,res)=>{


const id=String(
req.body.id
);



const balance=
Number(req.body.balance);



updateBalance(

id,

balance

);



res.json({

success:true

});



}

);









// =============================
// SERVER
// =============================


const PORT =
process.env.PORT || 3000;



app.listen(

PORT,

()=>{


console.log(

"Battle Game server started",

PORT

);


}

);

// =====================================
// BATTLE GAME DATABASE
// DRAGON EGGS SYSTEM
// =====================================


const sqlite3 = require("sqlite3").verbose();

const path = require("path");



const db = new sqlite3.Database(

path.join(
__dirname,
"battle.db"
)

);







// =====================================
// CREATE TABLES
// =====================================


function initDatabase(){



db.run(`

CREATE TABLE IF NOT EXISTS players (

id TEXT PRIMARY KEY,

username TEXT,

first_name TEXT,

avatar TEXT,


nickname TEXT DEFAULT 'Dragon',

nickname_color TEXT DEFAULT '#ffffff',


balance REAL DEFAULT 0,


income REAL DEFAULT 0,


api_key TEXT,


friends INTEGER DEFAULT 0,


last_free_egg INTEGER DEFAULT 0,


created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);








db.run(`

CREATE TABLE IF NOT EXISTS eggs (


id INTEGER PRIMARY KEY AUTOINCREMENT,


owner TEXT,


type TEXT,


level INTEGER DEFAULT 1,


price INTEGER,


income REAL,


created_at DATETIME DEFAULT CURRENT_TIMESTAMP


)

`);







db.run(`

CREATE TABLE IF NOT EXISTS transfers (


id INTEGER PRIMARY KEY AUTOINCREMENT,


from_id TEXT,


to_id TEXT,


amount REAL,


date DATETIME DEFAULT CURRENT_TIMESTAMP


)

`);







console.log(

"Battle database ready"

);



}









// =====================================
// GET PLAYER
// =====================================


function getPlayer(id,callback){


db.get(

`

SELECT *

FROM players

WHERE id=?

`,

[id],

callback

);



}









// =====================================
// CREATE PLAYER
// =====================================


function createPlayer(data,callback){



db.run(

`

INSERT OR IGNORE INTO players

(

id,

username,

first_name,

avatar,

nickname,

api_key

)

VALUES

(?,?,?,?,?,?)

`,

[


data.id,


data.username || "",


data.first_name || "",


data.avatar || "",


"Dragon",


"API-"+data.id+"-"+Date.now()


],


()=>{


// выдаём стартовое яйцо SINNI


db.run(

`

INSERT INTO eggs

(

owner,

type,

price,

income

)

VALUES

(?,?,?,?)

`,

[

data.id,

"SINNI",

10000,

0.001

]


);



if(callback)

callback();



}



);



}









// =====================================
// GET PLAYER EGGS
// =====================================


function getEggs(id,callback){



db.all(

`

SELECT *

FROM eggs

WHERE owner=?

`,

[id],

callback



);



}









// =====================================
// ADD BALANCE
// =====================================


function addBalance(id,amount){



db.run(

`

UPDATE players

SET balance = balance + ?

WHERE id=?

`,

[

amount,

id

]


);



}









// =====================================
// UPDATE PLAYER
// =====================================


function updatePlayer(id,data){



db.run(

`

UPDATE players SET

balance=?,

income=?,

nickname=?,

nickname_color=?

WHERE id=?

`,

[


data.balance,


data.income,


data.nickname,


data.nickname_color,


id


]


);



}









// =====================================
// BUY EGG
// =====================================


function buyEgg(id,type,price,income,callback){



db.run(

`

INSERT INTO eggs

(

owner,

type,

price,

income

)

VALUES

(?,?,?,?)

`,

[

id,

type,

price,

income

],


callback



);



}









// =====================================
// DELETE EGG
// =====================================


function deleteEgg(id,eggId,callback){



db.run(

`

DELETE FROM eggs

WHERE id=?

AND owner=?

`,

[

eggId,

id

],


callback


);



}









module.exports = {


db,


initDatabase,


getPlayer,


createPlayer,


getEggs,


addBalance,


updatePlayer,


buyEgg,


deleteEgg


};

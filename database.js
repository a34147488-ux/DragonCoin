import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const db = new sqlite3.Database(
    path.join(__dirname,"battle.db")
);



export function initDatabase(){


db.run(`

CREATE TABLE IF NOT EXISTS players(

id TEXT PRIMARY KEY,

username TEXT,

first_name TEXT,

avatar TEXT,

nickname TEXT,

nickname_color TEXT DEFAULT "#ffffff",

balance REAL DEFAULT 0,

income REAL DEFAULT 0,

referrer TEXT,

free_egg_time INTEGER DEFAULT 0,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);





db.run(`

CREATE TABLE IF NOT EXISTS eggs(

id INTEGER PRIMARY KEY AUTOINCREMENT,

player_id TEXT,

type TEXT,

level INTEGER DEFAULT 1,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);





db.run(`

CREATE TABLE IF NOT EXISTS history(

id INTEGER PRIMARY KEY AUTOINCREMENT,

player TEXT,

action TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);





console.log(
"Battle database ready"
);


}








export function getPlayer(id,callback){


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








export function createPlayer(data,callback){


db.run(

`

INSERT OR IGNORE INTO players

(
id,
username,
first_name,
avatar,
nickname,
referrer
)

VALUES(?,?,?,?,?,?)

`,

[

data.id,

data.username || "",

data.first_name || "",

data.avatar || "",

data.first_name || "Dragon",

data.ref || null

],


callback


);


}







export function addEgg(player,type){


db.run(

`

INSERT INTO eggs

(
player_id,
type
)

VALUES(?,?)

`,

[
player,
type
]


);


}







export function getEggs(player,callback){


db.all(

`

SELECT *
FROM eggs
WHERE player_id=?

`,

[player],

callback


);


}






export function updateBalance(id,balance){


db.run(

`

UPDATE players

SET balance=?

WHERE id=?

`,

[
balance,
id
]


);


}





export default db;

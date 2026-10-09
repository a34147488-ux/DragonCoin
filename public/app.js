// =====================================
// BATTLE GAME APP LOGIC
// MAIN SYSTEM
// =====================================


let player = null;





// =====================================
// LOAD PLAYER
// =====================================


async function loadPlayer(){


const tg =

window.Telegram?.WebApp;



if(!tg || !tg.initDataUnsafe.user){

console.log(
"Telegram user not found"
);

return;

}



let user = tg.initDataUnsafe.user;





try{


let response = await fetch(

CONFIG.API_URL + "/player",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

id:String(user.id),

username:user.username || "",

first_name:user.first_name || "",

avatar:user.photo_url || ""

})

}

);





let data = await response.json();





if(data.player){


player = data.player;


localStorage.setItem(

"battle_player",

JSON.stringify(player)

);


updateUI();


}


}

catch(e){


console.log(
"Player load error",
e
);


}


}









// =====================================
// UPDATE UI
// =====================================


function updateUI(){


if(!player)

return;




let balance =

document.getElementById(

"balance"

);



if(balance){

balance.innerText =

Number(player.balance || 0)
.toFixed(3);


}





let income =

document.getElementById(

"income"

);



if(income){

income.innerText =

"+ " +

Number(player.income || 0)
.toFixed(3)

+

" / мин";

}



}









// =====================================
// FREE SINNI EGG
// =====================================


function checkFreeEgg(){



if(!player)

return;



let block =

document.getElementById(

"freeEgg"

);



if(!block)

return;






let now = Date.now();



let last =

player.last_free_egg || 0;






let time =

86400000 -

(now-last);






if(time <=0){



block.innerHTML = `

<div class="egg-mini">

S

</div>


<h2>

Бесплатное SINNI

</h2>


<button class="big-button"

onclick="getFreeEgg()">

ПОЛУЧИТЬ

</button>

`;



}

else{



let hours =

Math.floor(

time / 3600000

);



let minutes =

Math.floor(

(time % 3600000)

/60000

);





block.innerHTML = `


<div class="egg-mini">

S

</div>


<h2>

Новое яйцо через:

</h2>


<p>

${hours}ч ${minutes}м

</p>


`;



}



}









// =====================================
// GET FREE EGG
// =====================================


function getFreeEgg(){



if(!player)

return;




player.last_free_egg = Date.now();



localStorage.setItem(

"battle_player",

JSON.stringify(player)

);





alert(

"SINNI получено"

);



checkFreeEgg();



}









// =====================================
// NAVIGATION
// =====================================


function navigation(){



document

.querySelectorAll(".menu button")

.forEach(btn=>{



btn.onclick=()=>{



let page =

btn.dataset.page;





document

.querySelectorAll(".page")

.forEach(p=>{


p.classList.remove(

"active"

);


});







let target =

document.getElementById(

page

);



if(target)

target.classList.add(

"active"

);






document

.querySelectorAll(".menu button")

.forEach(b=>{


b.classList.remove(

"active"

);


});





btn.classList.add(

"active"

);




};



});


}









// =====================================
// START
// =====================================



document.addEventListener(

"DOMContentLoaded",

()=>{


navigation();


loadPlayer();



setInterval(

checkFreeEgg,

60000

);


});

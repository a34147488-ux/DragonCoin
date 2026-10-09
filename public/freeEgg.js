// =====================================
// BATTLE GAME
// FREE DAILY EGG SYSTEM
// =====================================



const FREE_EGG_TIME = 24 * 60 * 60 * 1000;

const CLAIM_TIME = 60 * 60 * 1000;





// =====================================
// CHECK FREE EGG
// =====================================


function checkFreeEgg(){



if(!player)

return;






let now = Date.now();





if(!player.freeEggCreated){



player.freeEggCreated = now;



saveFreeEgg();



}






let passed =

now - player.freeEggCreated;







let box =

document.getElementById(

"freeEggBox"

);






if(!box)

return;







// если сутки прошли создаём яйцо



if(passed >= FREE_EGG_TIME){



if(!player.freeEggAvailable){



player.freeEggAvailable = true;


player.freeEggExpire = now + CLAIM_TIME;



saveFreeEgg();



}



}









if(player.freeEggAvailable){



let left =

player.freeEggExpire - now;






if(left <=0){



player.freeEggAvailable=false;


player.freeEggCreated=now;


saveFreeEgg();



box.innerHTML=

`

<div class="free-empty">

Яйцо исчезло<br>

Следующее через 24 часа

</div>

`;



return;



}






let minutes =

Math.floor(

left / 60000

);






box.innerHTML=

`

<div class="free-egg-card">



<div class="free-egg">

SINNI

</div>



<h3>

Бесплатное яйцо

</h3>



<p>

Забрать можно:

${minutes}

мин.

</p>



<button onclick="claimFreeEgg()">

ПОЛУЧИТЬ

</button>



</div>

`;





}

else{



let next =

FREE_EGG_TIME - passed;






let hours =

Math.floor(

next / 3600000

);






let minutes =

Math.floor(

(next % 3600000)

/60000

);







box.innerHTML=

`

<div class="free-empty">

Следующее яйцо через

<br>

${hours}ч ${minutes}м

</div>

`;



}





}









// =====================================
// CLAIM
// =====================================


function claimFreeEgg(){



if(!player)

return;







if(!player.eggs)

player.eggs={};







if(!player.freeEggAvailable)

return;







player.eggs.SINNI =

(player.eggs.SINNI || 0) + 1;






player.freeEggAvailable=false;


player.freeEggCreated=Date.now();






saveFreeEgg();



loadEggs();



alert(

"Получено яйцо SINNI"

);



}









// =====================================
// SAVE
// =====================================


function saveFreeEgg(){



localStorage.setItem(

"battle_player",

JSON.stringify(player)

);



}









// =====================================
// TIMER
// =====================================


setInterval(()=>{


checkFreeEgg();



},1000);







document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(()=>{


checkFreeEgg();



},1500);



});







window.claimFreeEgg = claimFreeEgg;

window.checkFreeEgg = checkFreeEgg;

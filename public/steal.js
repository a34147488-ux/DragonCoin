// =====================================
// BATTLE GAME
// STEAL EGG SYSTEM
// =====================================



let stealCooldown = false;







// =====================================
// OPEN STEAL WINDOW
// =====================================


function openSteal(){



let box =

document.getElementById(

"stealBox"

);






if(!box)

return;







box.innerHTML=

`

<div class="steal-panel">


<h2>

ОХОТА НА ЯЙЦО

</h2>


<div class="dragon-fight">


<div class="dragon red">

</div>


<div class="lightning">

⚡

</div>


<div class="dragon black">

</div>


</div>




<p>

Выбери случайного владельца

</p>



<button onclick="startSteal()">

НАЧАТЬ БОЙ

</button>



<div id="stealResult">

</div>


</div>

`;



}









// =====================================
// START STEAL
// =====================================


function startSteal(){



if(stealCooldown)

return;






if(!player)

return;






stealCooldown=true;







let result =

document.getElementById(

"stealResult"

);






if(result)

result.innerHTML=

`

Поиск дракона...

`;








fetch(

CONFIG.API_URL+"/players/random"

)

.then(

r=>r.json()

)

.then(

data=>{



setTimeout(()=>{



battlePlayer(data.player);



},1500);



})

.catch(()=>{



if(result)

result.innerHTML=

"Ошибка поиска";



});







setTimeout(()=>{


stealCooldown=false;



},30000);



}









// =====================================
// BATTLE
// =====================================


function battlePlayer(enemy){



let result =

document.getElementById(

"stealResult"

);






if(!enemy){



result.innerHTML=

"Нет доступных игроков";



return;

}



let eggs =

enemy.eggs || {};







let available=[];







Object.keys(eggs)

.forEach(id=>{



if(eggs[id]>0)

available.push(id);



});







if(available.length===0){



result.innerHTML=

`

У игрока нет яиц

`;



return;



}







let target =

available[

Math.floor(

Math.random()*available.length

)

];







let success =

Math.random() < 0.35;







if(success){



if(!player.eggs)

player.eggs={};







player.eggs[target] =

(player.eggs[target]||0)+1;







result.innerHTML=

`

Победа!

<br>

Украдено яйцо:

${target}

`;





}

else{



result.innerHTML=

`

Дракон проиграл бой

<br>

Яйцо защищено

`;



}








saveEggs();



loadEggs();



}









window.openSteal=openSteal;

window.startSteal=startSteal;

// =====================================
// BATTLE GAME
// PLAYER RATING SYSTEM
// =====================================




// =====================================
// LOAD RATING
// =====================================


async function loadRating(){



let list =

document.getElementById(

"ratingList"

);






if(!list)

return;






list.innerHTML=

`

<div class="loading">

Поиск сильнейших драконов...

</div>

`;







try{



let response =

await fetch(

CONFIG.API_URL+"/rating"

);







let data =

await response.json();








if(!data.players){



list.innerHTML=

"Нет игроков";

return;

}







renderRating(

data.players

);





}

catch(e){



list.innerHTML=

`

Ошибка загрузки рейтинга

`;



}



}









// =====================================
// DRAW LIST
// =====================================


function renderRating(players){



let list =

document.getElementById(

"ratingList"

);







if(!list)

return;







list.innerHTML="";








players.forEach(

(player,index)=>{






let eggsCount = 0;







if(player.eggs){



Object.values(

player.eggs

)

.forEach(

x=>{

eggsCount += x;

}

);



}








let income =

calculateIncome(

player.eggs

);







let item =

document.createElement(

"div"

);







item.className=

"rating-player";








item.innerHTML=

`

<div class="place">

#

${index+1}

</div>




<div class="avatar">


<img src="

${player.avatar || 'img/avatar.png'}

">


</div>




<div class="player-info">


<h3 style="color:${player.name_color || '#fff'}">

${player.username || "Игрок"}

</h3>



<p>

Яйца:

${eggsCount}

</p>



<p>

Доход:

${income}

/ мин

</p>



</div>


`;







list.appendChild(

item

);



});





}









// =====================================
// CALCULATE INCOME
// =====================================


function calculateIncome(eggs){



if(!eggs)

return 0;







let income=0;







const power={



SINNI:0.001,


BORLI:0.010,


BONI:0.075,


JOUNI:0.100,


"SIXI LEGA":5



};







Object.keys(eggs)

.forEach(

egg=>{



income +=

( power[egg] || 0 )

*

eggs[egg];



});







return income.toFixed(3);



}









// =====================================
// REFRESH
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(()=>{


loadRating();



},1500);



});








window.loadRating = loadRating;
window.calculateIncome = calculateIncome;

// =====================================
// BATTLE GAME
// RATING SYSTEM
// =====================================



async function loadRating(){



let box =

document.getElementById(

"ratingList"

);





if(!box)

return;





box.innerHTML =

`

<div class="loading">

Загрузка драконов...

</div>

`;







try{



let response = await fetch(

CONFIG.API_URL + "/rating"

);







let data = await response.json();







if(!data.players)

return;








box.innerHTML="";






data.players.forEach((item,index)=>{





let card = document.createElement(

"div"

);



card.className="rating-card";






card.innerHTML=`

<div class="rank">

${index+1}

</div>


<div class="dragon-avatar">


</div>


<div class="player-info">


<h3 style="color:${item.nickname_color}">

${item.nickname}

</h3>


<p>

Баланс:

${Number(item.balance).toFixed(3)}

</p>


<p>

Яиц:

${item.eggs || 0}

</p>



</div>


`;






box.appendChild(card);





});




}

catch(e){



box.innerHTML=

`

Ошибка загрузки рейтинга

`;



}



}










// =====================================
// OPEN PLAYER PROFILE
// =====================================



function openProfile(id){



alert(

"Профиль игрока: "+id

);



}








document.addEventListener(

"DOMContentLoaded",

()=>{


loadRating();



});







window.loadRating=loadRating;

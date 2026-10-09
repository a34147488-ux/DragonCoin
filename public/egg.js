// =====================================
// BATTLE GAME
// EGG SYSTEM
// =====================================



const EGGS = {


SINNI:{

name:"SINNI",

price:10000,

income:0.001,

color:"#ffd700"

},




BORLI:{

name:"BORLI",

price:50000,

income:0.010,

color:"#00ffff"

},




BONI:{

name:"BONI",

price:100000,

income:0.075,

color:"#9b00ff"

},




JOUNI:{

name:"JOUNI",

price:700000,

income:0.100,

color:"#ff3300"

},




SIXI_LEGA:{

name:"SIXI LEGA",

price:1300000,

income:5,

color:"#ffffff"

}



};









// =====================================
// SHOW EGGS
// =====================================


function loadEggs(){



let box =

document.getElementById(

"eggList"

);





if(!box)

return;






box.innerHTML="";







Object.keys(EGGS)

.forEach(id=>{





let egg = EGGS[id];






let count =

(player.eggs && player.eggs[id])

||

0;







let price =

egg.price *

Math.pow(

3,

count

);









let card = document.createElement(

"div"

);






card.className=

"egg-card";







card.innerHTML=

`

<div class="egg-image"

style="background:${egg.color}">

</div>



<h3>

${egg.name}

</h3>



<p>

Цена:

${price}

</p>



<p>

В наличии:

${count}

</p>



<p>

+${egg.income}

 / мин

</p>



<button onclick="buyEgg('${id}')">

Купить

</button>



<button onclick="sellEgg('${id}')">

Продать

</button>


`;







box.appendChild(card);






});



}









// =====================================
// BUY
// =====================================


function buyEgg(id){



if(!player)

return;






let egg = EGGS[id];







if(!player.eggs)

player.eggs={};







let count =

player.eggs[id] || 0;






let price =

egg.price *

Math.pow(

3,

count

);







if(player.balance < price){



alert(

"Недостаточно баланса"

);



return;



}








player.balance -= price;






player.eggs[id] = count + 1;






saveEggs();



updateUI();



loadEggs();



}









// =====================================
// SELL
// =====================================


function sellEgg(id){



if(!player || !player.eggs)

return;







let count =

player.eggs[id] || 0;







if(count <=0)

return;







let egg = EGGS[id];






player.eggs[id]--;






player.balance +=

egg.price;



saveEggs();



updateUI();



loadEggs();



}









// =====================================
// SAVE
// =====================================


function saveEggs(){



localStorage.setItem(

"battle_player",

JSON.stringify(player)

);







fetch(

CONFIG.API_URL+"/eggs/update",

{


method:"POST",


headers:{


"Content-Type":

"application/json"

},


body:JSON.stringify({


id:String(player.id),


eggs:player.eggs


})


}

);



}









// =====================================
// INCOME
// =====================================


function calculateEggIncome(){



if(!player || !player.eggs)

return;






let income = 0;







Object.keys(player.eggs)

.forEach(id=>{





let egg = EGGS[id];





income +=

egg.income *

player.eggs[id];





});






return income;



}








window.EGGS = EGGS;

window.loadEggs = loadEggs;

window.buyEgg = buyEgg;

window.sellEgg = sellEgg;

window.calculateEggIncome = calculateEggIncome;







document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(()=>{


loadEggs();



},1000);



});

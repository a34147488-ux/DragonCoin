// =====================================
// BATTLE GAME
// EGGS SYSTEM
// =====================================


let playerEggs = [];





const EGGS_DATA = {


"SINNI":{

price:10000,

income:0.001,

color:"#d8d8d8",

spots:"#555"

},



"BORLI":{

price:50000,

income:0.010,

color:"#2979ff",

spots:"#00e5ff"

},




"BONI":{

price:100000,

income:0.075,

color:"#9c27b0",

spots:"#ffeb3b"

},




"JOUNI":{

price:700000,

income:0.100,

color:"#ff5722",

spots:"#ffd700"

},





"SIXI LEGA":{

price:1300000,

income:5,

color:"#111",

spots:"#ffd700"

}



};









// =====================================
// LOAD EGGS
// =====================================


async function loadEggs(){



if(!player)

return;



try{


let response = await fetch(

CONFIG.API_URL + "/eggs",

{


method:"POST",

headers:{


"Content-Type":

"application/json"

},


body:JSON.stringify({

id:String(player.id)

})


}

);





let data = await response.json();




if(data.eggs){


playerEggs=data.eggs;


renderEggs();


}



}

catch(e){


console.log(
"Egg load error",
e
);


}



}









// =====================================
// RENDER EGGS
// =====================================


function renderEggs(){



let box =

document.getElementById(

"eggList"

);



if(!box)

return;





box.innerHTML="";






Object.keys(EGGS_DATA)

.forEach(type=>{





let egg = EGGS_DATA[type];





let count =

playerEggs.filter(

e=>e.type===type

).length;








let card = document.createElement(

"div"

);



card.className="egg-card";





card.innerHTML=`

<div class="dragon-egg"

style="

background:${egg.color};

box-shadow:0 0 35px ${egg.spots};

">


<div class="spots">

</div>


</div>


<h2>${type}</h2>


<p>

Стоимость:

${egg.price}

</p>


<p>

Доход:

+${egg.income}

 / мин

</p>


<p>

У вас:

${count}

</p>



<button onclick="buyEgg('${type}')">

КУПИТЬ

</button>


<button onclick="stealEgg('${type}')">

СВОРОВАТЬ

</button>



`;





box.appendChild(card);



});



}









// =====================================
// BUY
// =====================================


async function buyEgg(type){



if(!player)

return;




let data = EGGS_DATA[type];





if(player.balance < data.price){


alert(

"Недостаточно средств"

);


return;


}







try{


let response = await fetch(

CONFIG.API_URL+"/buy",

{


method:"POST",


headers:{


"Content-Type":

"application/json"

},


body:JSON.stringify({


id:String(player.id),


type:type


})


}

);







let result = await response.json();





if(result.success){



player.balance=result.balance;



updateUI();



loadEggs();



}



else{


alert(

result.message

);


}




}

catch(e){


alert(

"Ошибка"

);


}




}









// =====================================
// STEAL RANDOM EGG
// =====================================


async function stealEgg(type){



if(!player)

return;





let chance =

Math.random();





if(chance < 0.5){


alert(

"Дракон не смог украсть яйцо"

);


return;


}







alert(

"Вы украли яйцо "+type

);





}









// =====================================
// START
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(()=>{


loadEggs();



},1500);



});









window.loadEggs=loadEggs;

window.buyEgg=buyEgg;

window.stealEgg=stealEgg;

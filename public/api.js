// =====================================
// BATTLE GAME
// API KEY SYSTEM
// =====================================



function generateAPI(){



if(!player)

return;






let key =

"BATTLE-"

+

crypto.randomUUID()

.toUpperCase();







player.api_key = key;






localStorage.setItem(

"battle_player",

JSON.stringify(player)

);







let result =

document.getElementById(

"apiResult"

);






if(result){



result.innerHTML = `

<div class="api-card">

${key}

</div>

`;



}






saveAPI(key);



}









// =====================================
// SAVE API
// =====================================


async function saveAPI(key){



try{



await fetch(

CONFIG.API_URL+"/api/create",

{


method:"POST",


headers:{


"Content-Type":

"application/json"

},


body:JSON.stringify({


id:String(player.id),


key:key


})


}

);




}

catch(e){


console.log(

"API save error"

);



}



}









// =====================================
// SHOW EXISTING KEY
// =====================================


function showAPI(){



if(!player)

return;






let result =

document.getElementById(

"apiResult"

);







if(result){



if(player.api_key){



result.innerHTML=

`

<div class="api-card">

${player.api_key}

</div>

`;



}

else{


result.innerHTML=

`

<div class="api-card">

Ключ отсутствует

</div>

`;



}



}



}









document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(()=>{


showAPI();



},1000);



});








window.generateAPI=generateAPI;

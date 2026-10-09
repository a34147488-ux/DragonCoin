// =====================================
// BATTLE GAME
// PLAYER PROFILE SYSTEM
// =====================================



// =====================================
// LOAD PROFILE
// =====================================


function loadProfile(){



if(!player)

return;






let name =

document.getElementById(

"profileName"

);






let color =

document.getElementById(

"profileColor"

);







let balance =

document.getElementById(

"profileBalance"

);







let eggs =

document.getElementById(

"profileEggs"

);








if(name){



name.innerText =

player.username ||

player.first_name ||

"Игрок";



}







if(color){



color.style.color =

player.name_color ||

"#ffffff";



}







if(balance){



balance.innerText =

Math.floor(

player.balance || 0

);



}







if(eggs){



let text="";






if(player.eggs){



Object.keys(player.eggs)

.forEach(id=>{



if(player.eggs[id]>0){



text +=

`

${id}

×

${player.eggs[id]}

<br>

`;



}



});



}








eggs.innerHTML =

text ||

"Нет яиц";





}







}









// =====================================
// CHANGE NICKNAME
// =====================================


function changeNickname(){



let value =

prompt(

"Введите новый ник"

);







if(!value)

return;







player.username=value;



saveProfile();



loadProfile();



}









// =====================================
// CHANGE COLOR
// =====================================


function changeNameColor(color){



if(!player)

return;







player.name_color=color;



saveProfile();



loadProfile();



}









// =====================================
// SAVE
// =====================================


function saveProfile(){



localStorage.setItem(

"battle_player",

JSON.stringify(player)

);







fetch(

CONFIG.API_URL+"/profile/update",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({



id:String(player.id),



username:

player.username,



name_color:

player.name_color



})

}


);



}









// =====================================
// COLOR MENU
// =====================================


function openColors(){



let box =

document.getElementById(

"colorList"

);







if(!box)

return;








box.innerHTML=

`

<div class="color-choice">

<button onclick="changeNameColor('#ffd700')">

GOLD

</button>



<button onclick="changeNameColor('#ff0000')">

RED

</button>



<button onclick="changeNameColor('#9900ff')">

PURPLE

</button>



<button onclick="changeNameColor('#00ffff')">

BLUE

</button>



<button onclick="changeNameColor('#00ff55')">

GREEN

</button>


</div>

`;



}









document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(()=>{


loadProfile();



},1000);



});








window.loadProfile=loadProfile;

window.changeNickname=changeNickname;

window.changeNameColor=changeNameColor;

window.openColors=openColors;

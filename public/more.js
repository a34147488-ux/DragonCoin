// =====================================
// BATTLE GAME
// MORE SETTINGS
// =====================================



// =====================================
// NICKNAME
// =====================================


function changeNickname(){



if(!player)

return;






let input =

document.getElementById(

"nicknameInput"

);





if(!input || !input.value)

return;







let name =

input.value.trim();






if(name.length < 3){


alert(

"Минимум 3 символа"

);


return;


}







player.nickname = name;






saveMoreData();






alert(

"Ник изменён"

);





}









// =====================================
// NICK COLOR
// =====================================


function changeNickColor(color){



if(!player)

return;





player.nickname_color = color;






saveMoreData();






let nick =

document.getElementById(

"profileNick"

);






if(nick){



nick.style.color=color;



}




}









// =====================================
// SAVE
// =====================================


function saveMoreData(){



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


nickname:player.nickname,


nickname_color:

player.nickname_color


})


}

);



}









// =====================================
// SHOW PROFILE
// =====================================


function updateProfile(){



if(!player)

return;







let nick =

document.getElementById(

"profileNick"

);






if(nick){



nick.innerText =

player.nickname ||

"Дракон";



nick.style.color =

player.nickname_color ||

"#ffffff";



}





}









// =====================================
// COLOR BUTTONS
// =====================================


function initColors(){



document

.querySelectorAll(

".color-fragment"

)

.forEach(btn=>{



btn.onclick=()=>{



let color =

btn.dataset.color;



changeNickColor(color);



};



});



}









// =====================================
// START
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(()=>{


updateProfile();


initColors();



},1000);



});







window.changeNickname=

changeNickname;


window.changeNickColor=

changeNickColor;

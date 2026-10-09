// =====================================
// BATTLE GAME
// LIGHTNING EFFECT SYSTEM
// =====================================



function createLightning(){



let flash = document.createElement(

"div"

);




flash.className =

"lightning-flash";






document.body.appendChild(

flash

);






setTimeout(()=>{


flash.remove();



},300);



}









function randomLightning(){



let chance =

Math.random();






if(chance < 0.35){



createLightning();



}



}









// =====================================
// TAB EFFECT
// =====================================


function lightningOpen(){



createLightning();



}









// =====================================
// AUTO EFFECT
// =====================================


setInterval(()=>{


randomLightning();



},5000);









// =====================================
// CONNECT MENU
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{



document

.querySelectorAll(

".nav"

)

.forEach(button=>{



button.addEventListener(

"click",

()=>{



lightningOpen();



}



);



});



});








window.createLightning=createLightning;

// =====================================
// BATTLE GAME
// INVITE SYSTEM
// =====================================



function createInviteLink(){



if(!player)

return "";





let botName =

CONFIG.BOT_USERNAME || "YOUR_BOT";







return (

"https://t.me/"

+

botName

+

"?start="

+

player.id

);



}









// =====================================
// UPDATE INVITE BLOCK
// =====================================


function updateInvite(){



let link =

document.getElementById(

"inviteLink"

);




let count =

document.getElementById(

"inviteCount"

);





if(!player)

return;







if(link){



link.value =

createInviteLink();



}






if(count){



count.innerText =

player.referrals || 0;



}



}









// =====================================
// COPY LINK
// =====================================


function copyInvite(){



let link =

createInviteLink();






if(!link)

return;








navigator.clipboard.writeText(

link

);






alert(

"Ссылка скопирована"

);



}









// =====================================
// SHARE TELEGRAM
// =====================================


function shareInvite(){



let link =

createInviteLink();






if(!link)

return;







let text =

"Выращивай драконов в Battle Game";








if(window.Telegram && Telegram.WebApp){



Telegram.WebApp.openTelegramLink(

"https://t.me/share/url?url="

+

encodeURIComponent(link)

+

"&text="

+

encodeURIComponent(text)

);



}

else{


navigator.clipboard.writeText(link);



}



}









document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(()=>{


updateInvite();



},1000);



});








window.copyInvite=copyInvite;

window.shareInvite=shareInvite;

window.createInviteLink=createInviteLink;

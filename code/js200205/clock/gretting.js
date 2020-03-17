const form = document.querySelector('.js-form'),
    input = form.document.querySelector('input');
    greeting = document.querySelector('.js-greetings');


const USER_LS = 'currentUser',
    SHOWING_CN = 'showing';

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
     
}
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //유저가 없는 경우
    }else{
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();
const send = require('./send_email');

async function init() {
    send();
    
    let time = 1000 * 3;

    setTimeout(() => {
        init();
    }, time);
    console.log('Tarefa Agendada');
}

init();
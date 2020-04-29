const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxfc526c1ad7a34048a7ae481b14cde9af.mailgun.org';
const mg = mailgun({domain: DOMAIN, apiKey: process.env.KEYMAILGUN});

module.exports = function (to, subject, html) {
    return mg.messages()
        .create({
            from: 'Empresa teste <julioarmando@julioamoreno.com>',
            to: [to],
            subject: subject,
            html: html
        })
        .then(msg => console.log(msg))
        .catch(err => console.log(err));
}
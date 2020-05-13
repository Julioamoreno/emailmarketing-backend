const mailgun = require('mailgun-js');
const DOMAIN = process.env.DOMAINMAILGUN;
const mg = mailgun({domain: DOMAIN, apiKey: process.env.KEYMAILGUN});

module.exports = function (to, subject, html) {
    return mg.messages()
        .send({
            from: 'Empresa teste ',
            to: [to],
            subject: subject,
            html: html,
        })
        .then(msg => console.log(msg))
        .catch(err => console.log(err));
}
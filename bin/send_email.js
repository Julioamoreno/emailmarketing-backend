const connecion = require('../src/db/connection');
const sender = require('../src/email/sender');
const campaignModel = require('../src/models/campaign');
const leadModel = require('../src/models/lead');
const tracker = require('../src/email/tracker');
const hoje = require('moment');

async function send() {
    let now = hoje().format();
    
    const campaigns = await campaignModel.find({
        start: {$lt: now}
    });
    console.log(`${now} e ${campaigns}`)
    // let leads = [];

    for (let i=0; i < campaigns.length; i++) {
        console.log('Send Campaign');
        let lists = campaigns[i].lists;

        let leads = await leadModel.find({ lists: {$in: lists} });
        leads.map((lead) => {
            console.log('Send Lead');
            let mailBody = tracker(
                campaigns[i].body, 
                campaigns[i]._id,
                lead._id
            );
            const retor =  sender(lead.email, campaigns[i].title, mailBody);
            console.log(`${lead.email}, ${campaigns[i].title}, ${mailBody}  ${retor}`);
        });
        campaigns[i].status = 'enviado';
        campaigns[i].save();

        console.log('End Campaign');
    }
}

module.exports = send;
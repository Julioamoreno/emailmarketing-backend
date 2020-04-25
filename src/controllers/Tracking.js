const campaingModel = require('../models/campaign');
const leadModel = require('../models/lead');

const Tracking = {
    open(req, res){
        const campaingId = req.params.id;
        const leadId = req.params.leadid;

        campaingModel.findById(campaingId, function (err, campaign) {
            if(err) {
                return err;
            }
            if(!campaign){
                return;
            }
            campaign.opens += 1;
            campaign.save();
            console.log(campaign);
        });
        leadModel.findById(leadId, (err, lead) => {
            if (err) {
                return err;
            }
            if (!lead) {
                return;
            }
            const actions = lead.actions;
            actions.push({
                campaing: campaingId,
                action: [{
                    typeAction: 'open',
                    link: '',
                    date: new Date(),
                }]
            })

            lead.actions = actions;
            lead.save();
        });

        const buf = new Buffer(35);
        res.writeHead(200, {'Content-Type': 'image/gif'});
        res.end(buf, 'binary');

    },
    click(req, res){
        if (!req.query.link) {
            return res.status(404).send('Not Found');
        }
        const campaingId = req.params.id;
        const leadId = req.params.leadid;

        campaingModel.findById(campaingId, function (err, campaign) {
            if(err) {
                return err;
            }
            if(!campaign){
                return;
            }
            campaign.clicks += 1;
            campaign.save();
            console.log(campaign);
        });
        leadModel.findById(leadId, (err, lead) => {
            if (err) {
                return err;
            }
            if (!lead) {
                return;
            }
            const actions = lead.actions;
            actions.push({
                campaing: campaingId,
                action: [{
                    typeAction: 'click',
                    link: req.query.link,
                    date: new Date(),
                }]
            })

            lead.actions = actions;
            lead.save();
            console.log(lead);
        });

        res.writeHead(302, {
            'Location': req.query.link
        });
        res.end();
    }

}

module.exports = Tracking;
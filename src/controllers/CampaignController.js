const campaign = require('../models/campaign');
const tracker = require('../email/tracker');
const ServiceList = require('../services/Crud');
const service = new ServiceList(campaign);

const ListsController = {
    show (req, res) {
        service.list()
            .then(result => {
                return res.json(result);

            })
            .catch(err =>{
                return res.status(400).json({err});
            }
        );
    },

    store(req, res) {
        service.add(req.body)
            .then(result => {
                return res.json(result);
            })
            .catch(err =>{
                return res.status(422).json({err: err});
                
            }
        )
    },
    showOne (req, res) {

        service.listOne(req.params.id)
            .then(result => {
                return res.json(result);

            })
            .catch(err =>{
                return res.status(400).json({err});
            }
        );
    },
    edit (req, res) {
        let data = req.body;
        // data.lists = [];
        Object.keys(req.body).forEach((element, index) => {
            console.log(element)
            if (element.startsWith('lists[')) {
                data.lists.push( req.body[element] );
            } else {
                data[element] = req.body[element];
            }
        });
        
        service.edit(req.params.id, data)
            .then(result => {
                return res.json(result);

            })
            .catch(err =>{
                return res.status(400).json({err});
            }
        );
    },
    delete (req, res) {
        service.delete(req.params.id)
            .then(result => {
                return res.json(result);

            })
            .catch(err =>{
                return res.status(400).json({err});
            }
        );
    },
    renderEmail(req, res) {
        campaign.findById(req.params.id, (err, result) => {
            if (err) {
                return res.status(404).send('Not Found');
            }
            return res.render('mail_render', { body: result.body })
        });
    },
    inrenderEmail(req, res) {
        campaign.findById(req.params.id, (err, result) => {
            if (err) {
                return res.status(404).send('Not Found');
            }
            const body = tracker(result.body, req.params.id, req.params.leadid)
            return res.render('mail_render', { body: body })
        });
    },
}
module.exports = ListsController;
const campaign = require('../models/campaign');

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
}
module.exports = ListsController;
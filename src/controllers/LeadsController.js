const lead = require('../models/lead');

const ServiceList = require('../services/Crud');
const service = new ServiceList(lead);

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
        service.edit(req.params.id)
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
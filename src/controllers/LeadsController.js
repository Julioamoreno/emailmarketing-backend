const leadModel = require('../models/lead');
const listModel = require('../models/list');

const { validationResult } = require('express-validator')
const ServiceList = require('../services/Crud');
const service = new ServiceList(leadModel);

const LeadsController = {
    async subscribe(req, res){

        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(422).json(err);
        }else{
            let lista;
            //busca uma lista
            await listModel.findOne({ title: req.body.list }, async (err, result) => { 
                if(!result) { //verifica se essa lista não existe
                    //cria uma lista
                    await listModel.create({ title: req.body.list, quantity: 0}, (err, result) =>{
                        lista = result; //._id  
                    })
                }else{  //caso a lista exista
                    lista = result;  
                }
            })
            let register = function() {
                const lead = {
                    email: req.body.email,
                    lists: [lista._id]
                }
                leadModel.create(lead);

                lista.quantity ++; //incrementa a quantidade da lista
                lista.save();
            }

            let update = function(lead) {
                if (lead.lists.indexOf(lista._id) === -1 ) { //verifica se não existe o ID
                    lead.lists.push(lista._id); //adciona o id
                    lead.save();

                    lista.quantity ++; //incrementa a quantidade da lista
                    lista.save();
                }
            }

            leadModel.findOne({email: req.body.email}, function(err, lead) {
                if (err) return res.json(err);
                if (!lead) {
                    register();
                } else {
                    console.log(lead);
                    update(lead);
                }
            
            });
            leadModel.findOne({ email: req.body.email }).populate('lists').exec(function (err, res) {
                console.log(res);
            });

            return res.json({status:'Sucesso'})
        }
    },
    
    leadsByList (req, res) {
        leadModel.find({lists: {$in: [req.params.id] }}).populate('lists').exec(function (err, leads) {
            return res.json(leads);
        });
    },

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
        leadModel.findById((req.params.id)).populate('lists').exec((err, result) => {
            if (err) {
                return res.status(404).json(err);
            }
            return res.json(result);
        })
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
module.exports = LeadsController;
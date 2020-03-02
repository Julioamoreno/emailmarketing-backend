const User = require('../models/user');
const cfg = require('../../config');

const jwt = require('jwt-simple');

const UserController = {
    async store (req, res) {
        let data = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            accounts:[{
                name: req.body.account_name,
                role: 'owner',
                enabled: true
            }]
        }

        let newUser = await User.create(data)
            .catch(err =>{
            res.status(422).json({err})
            }
        );

        res.json(newUser);
    },
    async search(req, res){
        const user = await User.findById('5e5af03e4c5bec1f34fc274f')
        .catch(err => {
            res.status(500).json(err);
        });

        if(!user){
            return res.status(404).json({err: 'Usuário não encontrado.'})
        }
        res.status(200).json(user);
    },
    async auth(req, res){
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).send('Unathorized');
        }
        
        const user = await User.findOne({email: username, password})
            .catch(err => {
                res.status(500).json({err});
        })

        if (!user) {
            return res.status(401).send('Unathorized');
        }
        const payload = { id: user.id };
        const token = jwt.encode(payload, cfg.jwtSecret);
        return res.json({token: token});

    }

}

module.exports = UserController;
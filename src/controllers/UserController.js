const User = require('../models/user');

const jwt = require('jwt-simple');

const UserController = {
    async store (req, res) {
        let data = {
            name : req.body.nome,
            email : req.body.email,
            password : req.body.password,
            accounts:[{
                name: req.body.nomeConta,
                role: 'owner',
                enabled: true
            }]
        }

        let newUser = await User.create(data)
            .catch(err =>{
                console.log(err)
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
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).send('Unathorized');
        }
        
        const user = await User.findOne({email , password})
            .catch(err => {
                res.status(500).json({err});
        })

        if (!user) {
            return res.status(401).send('Unathorized');
        }
        const payload = { id: user.id };
        const token = jwt.encode(payload,  process.env.JWTSECRET);
        return res.json({
            token: token,
            nome: user.name

        });

    },
    async update(req, res){
        return res.send('teste');
    }

}

module.exports = UserController;
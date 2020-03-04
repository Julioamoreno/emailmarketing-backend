const User = require('../models/user');

const mongoose = require('mongoose');

describe('user', () => {
  beforeAll(async () => {
        if (!process.env.MONGO_URL){
            throw new Error('MongoDB server not initialized');
        }

      await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
      });
    });

    afterAll(async () => {
        await mongoose.connect.close();
    });

    beforeEach(async () => {
        await User.deleteMany({}); //deletando qualquer registro
        await User.create({         //Criando mock do cliente
            name: 'Pitoco da Silva',
            email: 'silva123@hotmail.com',
            password: '123123'        
        });
    });

    it('should insert a user', async () => {
        await User.create({
            name: 'Rob Wil',
            email: 'robw@hotmail.com',
            password: '321321'     
        });

        const usuarioInserido = await User.find({ });
        
        expect(usuarioInserido).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: 'robw@hotmail.com',

                }),
                expect.objectContaining({
                    email: 'silva123@hotmail.com',
                    
                })
            ])
        )
    });

    it('should select a user', async () => {
        const insertedUser = await User.findOne({ });
        
        expect(insertedUser).toEqual(
                expect.objectContaining({
                    email: 'silva123@hotmail.com'
                })
        );
    });

    it('should auth a user', async () => {
        const usuarioRetornado = await User.find({ email:'silva123@hotmail.com' });
        
        expect(usuarioRetornado).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: 'silva123@hotmail.com',
                }),
                expect.objectContaining({
                    password: '123123'
                })
            ])
        );
    });


});
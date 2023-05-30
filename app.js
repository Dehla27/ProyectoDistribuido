const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const app          = express();

const bcrypt        = require('bcrypt');
const mongoose      = require('mongoose');
const User          = require('./public/user');
const user = require('./public/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb://localhost:27017'

mongoose.connect(mongo_uri)
  .then(() => {
    console.log(`Successfully connected to ${mongo_uri}`);
    app.listen(3000, () => {
      console.log('Server started');
    });
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });

app.get('/', (req, res) => {

})
app.post('/register', (req, res) => {
    const{username, password} = req.body;

    const user = new User({username, password});

    user.save(err => {
        if(err){
            res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
        }else{
            res.status(200).send('USUARIO REGISTRADO');
        }
    });
})
app.post('/authenticate', (req, res) => {

    const {username, password} = req.body;

    user.findOne(err => {
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
        }else if(!user){
            res.status(500).send('NO SE ENCUENTRA EL USUARIO');
        }else{
            user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    res.status(500).send('ERROR AL AUTENTICAR');
                } else if(result){
                    res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE');
                }else{
                    res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
                }
            });
        }
    });
})
app.listen(3000, () =>{
    console.log('server started')
})
module.exports = app;
/* imports */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Meme = require('./models/memeSchema.js');

const dotenv = require('dotenv');
dotenv.config();


/*--------------- Bodyparser middleware -----------------*/
// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json());
app.use(cors());





/*--------------- database connection -------------------*/
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connected....'))
.catch( (err) => console.log(err));






/*----------------- routes -------------------------------*/
app.get('/', (req, res) => {
    res.send('This is XMeme backend');
})

app.get('/memes', (req, res) => {
    /* sorting accoring to latest ones */
    const query = Meme.find().sort( { date: -1 });
    query.exec()
    .then( result => {
        console.log(result);
        res.status(200).send(result);
    })
    .catch( err => {
        res.status(500).send(err);
    })
})

app.post('/memes', (req, res) => {
    const meme = new Meme( {
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        caption: req.body.caption,
        url: req.body.url,
        date: req.body.date
    })
    
    /* saving the data.... .save() returns a promise */
    meme.save()
    .then( (result) => {
        console.log(result);
        /* sending the json response as indicator of success */
        res.status(200).json({ message: 'successfully added to database'})
    })
    .catch( (err) => {
        console.log(err);
        res.status(500).json({ message: 'error while adding to database'})
    });

})

app.delete('/memes/:id', (req, res)=> {
    /* req.params containes properties mapped to route id */
    Meme.findById(req.params.id)
    .then( item_found => {
        item_found.remove().then( () =>  res.status(200).json({message: 'deleted successfully'}));
    })
    .catch( err => res.status(404).json({message: 'failed to delete item'}))
})






/*-------------------- server connection ------------------*/
const PORT = process.env.PORT || 5000;
app.listen( PORT, () => console.log(`Server connected on port ${PORT}`));






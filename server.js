import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express()
const port = 5000
const { MongoClient } = mongodb;

const conn =  await MongoClient.connect('mongodb://root:example@mongo:27017/?authSource=admin', {newUrlParser: true, useUnifiedTopology:true});
const db = conn.db('test');

fs.readFile('dictionary.json', async function (err, data) {
    const dictionary = JSON.parse(data)
    await db.collection('dictionary').insertMany(dictionary)
})

app.set('view engine', 'pug');
app.use(bodyParser.json());

app.post('/add-word', async (req, res) => {
    if (Object.keys(req.body).length > 0) {
        const {name, value} = req.body;
        await db.collection('dictionary').insertOne({name, value})
        res.send('Данные были успешно добавлены')
    } else {
        res.send('Что-то пошло не так. Попробуйте снова')
    }
})

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/mindmap', (req, res) => {
    res.sendFile(path.join(__dirname,'image1.png'))
})

app.get('/:word', async (req, res) => {

 const word = req.params.word;

 let result = await db.collection('dictionary').findOne({name: word});
 if (result) {
     const {name, value} = result;
     res.render('index', {title: 'Словарь', name, value});
 } else {
     res.render('form', {title: 'Словарь'})
 }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

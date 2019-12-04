const express = require("express");
const app = express();
app.use(
    express.json(),
    express.static(__dirname+'/public/dist/public')
);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/people' ,{useNewUrlParser: true});
const PeopleSchema = new mongoose.Schema({
    name: String
}, {timestamps: true});
const People = mongoose.model('People', PeopleSchema);

app.get('/', (req, res) => {
    People.find()
        .then(people => res.json(people))
        .catch(err => res.json(err));
})

app.get('/new/:name', (req, res) => {
    const { name } = req.params;
    const person = new People();
    person.name = name;
    person.save()
        .then(p => People.find()
                .then(people => res.json(people))
                .catch(err => res.json(err)));
})

app.get('/remove/:name', (req, res) => {
    const { name } = req.params;
    People.remove({ name: name})
        .then(p => People.find()
            .then(people => res.json(people))
            .catch(err => res.json(err)));
})

app.get('/:name', (req, res) => {
    const { name } = req.params;
    People.find({name: name})
        .then(person => res.json(person))
        .catch(err => res.json(err));
})

app.listen(8000, () => console.log("listening on port 8000"));
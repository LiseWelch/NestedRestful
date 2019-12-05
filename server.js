const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task' ,{useNewUrlParser: true});
const TaskSchema = new mongoose.Schema({
    title: String,
    description: {type: String, default: null},
    completed: {type: Boolean, default: false},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
const Task = mongoose.model('Task', TaskSchema);

app.use(
    express.json(),
    express.static(__dirname+'/public/dist/public')
);

app.get('/api/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
})

app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    Task.find({_id: id})
        .then(task => res.json(task))
        .catch(err => res.json(err));
})

app.post('/api/tasks/new', (req, res) => {
    const task = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;
    task.save()
        .then( t => res.json(t))
        .catch(err => res.json(err));
})

app.put('/api/tasks/update/:id', (req, res) => {
    const { id } = req.params;
    const task = Task.updateOne({_id: id}, {$set: {title: req.body.title, description: req.body.description, completed: req.body.completed}})
        .then(utask => res.json(utask))
        .catch(err => res.json(err));
})

app.delete('/api/tasks/delete/:id', (req, res) => {
    const { id } = req.params;
    Task.remove({_id: id})
        .then( rtask => res.json(rtask))
        .catch(err => res.json(err));
})

app.listen(8000, () => console.log("listening on port 8000"));

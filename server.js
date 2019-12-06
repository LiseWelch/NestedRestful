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
    let obj;
    Task.find()
        .then(tasks => {
            obj = { "tasks": tasks};
            res.json(obj)})
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
    if (req.body.title)
    {
        Task.updateOne({_id: id}, {$set: {title: req.body.title}})
        .then(utask => res.json(utask))
        .catch(err => res.json(err));
    }
    if (req.body.description)
    {
        Task.updateOne({_id: id}, {$set: {description: req.body.description}})
        .then(utask => res.json(utask))
        .catch(err => res.json(err));
    }
    if (req.body.completed)
    {
        Task.updateOne({_id: id}, {$set: {completed: req.body.completed}})
        .then(utask => res.json(utask))
        .catch(err => res.json(err));
    }
})

app.delete('/api/tasks/delete/:id', (req, res) => {
    const { id } = req.params;
    Task.remove({_id: id})
        .then( rtask => res.json(rtask))
        .catch(err => res.json(err));
})

app.listen(8000, () => console.log("listening on port 8000"));

// create web server
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// read json file
const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// middleware
app.use(cors());
app.use(bodyParser.json());

// get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    res.json(comment);
});

// create new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.json(comment);
});

// update comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    res.json(comment);
});

// delete comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

// listen to port
app.listen(port, () => console.log(`Listening on port ${port}...`));
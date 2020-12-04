const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());



let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('public/database/data.db');



db.run('CREATE TABLE IF NOT EXISTS comments (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, value TEXT);');



//создание комментария
app.post('/newcomment', (req, res) => {
    if (!req.body) {
        console.log('fail');
        console.log(req.body);
        return res.sendStatus(400);
    };
    db.run(`INSERT INTO comments (name, value) VALUES ('${req.body.name}', '${req.body.value}');`);
    res.sendStatus(200);
});


//получение списка комментариев
app.get('/getcomments', (req, res) => {
    db.all('SELECT name, value FROM comments ORDER BY id;', [], (err, rows) => {
        if (err) res.json({});
        else {
            res.json(JSON.stringify(rows))
        };
    });
});


//точка входа
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => {
})
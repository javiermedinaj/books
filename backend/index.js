import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books',
})

app.get('/', (req, res) => {
    res.json('books');
})


app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id =?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.post('/books', (req, res) => {
    const q = "INSERT into books(`name`, `description`,`cover`)VALUES(?)";
    const values = [
        req.body.name,
        req.body.description,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    })
})


app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `name`=?, `description`=?, `cover`=? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.description,
        req.body.cover
    ]
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    }
    )
})


app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id =?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});



app.listen(8000, () => {
    console.log("connect to backend server")
})
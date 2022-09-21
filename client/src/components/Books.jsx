import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get('http://localhost:8000/books');
                setBooks(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchAllBooks();
    }, [])
    console.log(books)
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/books/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>

            <div className="books">
                {books.map((book) => (

                    <div key={book.id} className="book">
                        {/* <img src={book.cover} /> */}
                        <h2>{book.name}</h2>
                        <h5>{book.description}</h5>
                        <button className="delete" onClick={() => handleDelete(book.id)}> delete</button>
                        <button className="update">
                            <Link to={`/update/${book.id}`}
                                style={{
                                    color: "inherit",
                                    textDecoration: "none"
                                }}>
                                update book
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
            <button className="addHome">
                <Link to="/add" style={{
                    color: "inherit",
                    textDecoration: "none"
                }}>
                    add new book
                </Link>
            </button>
        </div>

    )
}

export default Books
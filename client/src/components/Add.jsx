import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Add = () => {
    const [books, setBooks] = useState({
        name: '',
        description: '',
        // cover: '',
    });

    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/books", books)
            navigate("/")
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }





    return (
        <div className="form">
            <h2>add new book</h2>
            <input
                type="text"
                placeholder="book name"
                name="name"
                onChange={handleChange}
            />
            <textarea
                rows={3}
                type="text"
                placeholder="book description"
                name="description"
                onChange={handleChange}
            />
            {/* <input
                type="text"
                placeholder="book cover"
                name="cover"
                onChange={handleChange}
            /> */}
            <button onClick={handleClick} >
                Add
            </button>
            {error && error.message}
            <Link to="/">
                See all
            </Link>
        </div>
    )
}

export default Add
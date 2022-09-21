import React, { useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
    const [book, setBook] = useState({
        name: '',
        description: '',
        cover: '',
    });

    const [error, setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.pathname.split('/')[2];

    const handleChange = (e) => {
        setBook((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/books/${bookId}`, book);
            navigate("/")
        } catch (error) {
            setError(true)
            console.error(error)
        }
    }

    return (
        <div>
            <h1>update book</h1>
            <input
                type="text"
                placeholder="book name"
                name="name"
                onChange={handleChange}
            />
            <textarea
                rows={5}
                type="text"
                placeholder="Book desc"
                name="description"
                onChange={handleChange}
            />
            {/* <input
                type="text"
                placeholder="Book cover"
                name="cover"
                onChange={handleChange}
            /> */}
            <button onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>

        </div>
    )
}

export default Update
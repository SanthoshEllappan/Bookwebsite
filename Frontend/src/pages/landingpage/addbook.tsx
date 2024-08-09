import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/adminaddbook.css'; // Ensure this path is correct

const AdminAddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [country, setCountry] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [language, setLanguage] = useState('');
  const [link, setLink] = useState('');
  const [pages, setPages] = useState<number | ''>('');
  const [year, setYear] = useState<number | ''>('');
  const [bookid, setBookId] = useState<number | ''>('');
  const navigate = useNavigate();

  const handleAddBook = async () => {
    try {
      await axios.post('http://localhost:5000/api/books/add', {
        title,
        author,
        country,
        imageLink,
        language,
        link,
        pages,
        year,
        bookid
      });
      alert('Book added successfully');
      navigate('/adminlanding');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book');
    }
  };

  return (
    <div className="admin-add-book-container">
      <h2 className="admin-add-book-title">Add a New Book</h2>
      <form className="admin-add-book-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Enter book title"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
            placeholder="Enter author's name"
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="form-control"
            placeholder="Enter country"
          />
        </div>
        <div className="form-group">
          <label>Image Link</label>
          <input
            type="text"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="form-control"
            placeholder="Enter image link"
          />
        </div>
        <div className="form-group">
          <label>Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-control"
            placeholder="Enter language"
          />
        </div>
        <div className="form-group">
          <label>Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="form-control"
            placeholder="Enter link"
          />
        </div>
        <div className="form-group">
          <label>Pages</label>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="form-control"
            placeholder="Enter number of pages"
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="form-control"
            placeholder="Enter year of publication"
          />
        </div>
        <div className="form-group">
          <label>Book ID</label>
          <input
            type="number"
            value={bookid}
            onChange={(e) => setBookId(Number(e.target.value))}
            className="form-control"
            placeholder="Enter book ID"
          />
        </div>
        <button type="button" className="btn-submit" onClick={handleAddBook}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AdminAddBook;

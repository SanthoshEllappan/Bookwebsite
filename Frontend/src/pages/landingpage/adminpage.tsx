import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import Header from './header'; // Adjust the import paths
import Navbar from './navbar';
import SearchForm from './searchform';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../../styles/landingpage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './starratings'; // Import StarRating component

// Import images
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';

const AdminLandingPage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Array of imported images
  const images = [image1, image2, image3, image4, image5];

  useEffect(() => {
    axios.get("http://localhost:5000/api/books/")
      .then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data); // Set initial filtered books
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(lowercasedQuery) ||
        (Array.isArray(book.author) ? book.author.join(", ").toLowerCase().includes(lowercasedQuery) : book.author.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books); // Reset to all books if query is empty
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <Navbar />
      <SearchForm onSearch={handleSearch} />
      <div className="main-content">
        <div className="admin-actions">
          <Link to="/admin/addbook" className="admin-action">
            Add New Book
          </Link>
        </div>
        <div className="card-container">
          {filteredBooks.map((b) => {
            // Select a random image for each book card
            const randomImage = images[Math.floor(Math.random() * images.length)];

            return (
              <Link to={`/books/${b.bookid}`} key={b.bookid}>
                <Card
                  title={b.title}
                  subTitle={`Author: ${Array.isArray(b.author) ? b.author.join(", ") : b.author}`}
                  footer={<span>First Published: {b.year || 'Unknown'}</span>}
                  className="book-card"
                >
                  {/* Display random image */}
                  <img
                    src={randomImage}
                    alt={b.title}
                    className="book-image"
                  />
                  <p>{b.language || 'No description available'}</p>
                  {/* Display the average rating */}
                  <div className="book-rating">
                    <StarRating rating={b.averageRating || 0} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;

// import React, { useEffect, useState } from 'react';
// import { Card } from 'primereact/card';
// import Header from './header';  
// import Navbar from './navbar';
// import SearchForm from './searchform';
// import 'primereact/resources/themes/saga-blue/theme.css'; 
// import 'primereact/resources/primereact.min.css'; 
// import 'primeicons/primeicons.css'; 
// import '../../styles/landingpage.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// // Explicitly import images

// import image1 from '../../assets/1.jpg';
// import image2 from '../../assets/2.jpg';
// import image3 from '../../assets/3.jpg';
// import image4 from '../../assets/4.jpg';
// import image5 from '../../assets/5.jpg';


// const LandingPage: React.FC = () => {
//   const [books, setBooks] = useState([]);

//   // Array of image paths
//   const bookImages = [
//     image1,
//     image2,
//     image3,
//     image4,
//     image5,
//   ];

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/books/')
//       .then((res) => {
//         console.log(res.data);
//         setBooks(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="landing-page">
//       <Header />
//       <Navbar />
//       <SearchForm />
//       <div className="main-content">
//         {/* <h1>Welcome to the Book Review and Rating Site</h1> */}
//         <div className="card-container">
//           {books.map((book) => {
//             const randomImageIndex = Math.floor(Math.random() * bookImages.length);
//             const selectedImage = bookImages[randomImageIndex];
            
//             return (
//               <Link to={`/books/${book.bookid}`} key={book.bookid}>
//                 <Card
//                   title={book.title}
//                   subTitle={`Author: ${Array.isArray(book.author) ? book.author.join(", ") : book.author}`}
//                   footer={<span>First Published: {book.year || 'Unknown'}</span>}
//                   className="book-card"
//                 >
//                   <p>{book.language || 'No description available'}</p>
//                   <img
//                     src={selectedImage}
//                     alt={book.title}
//                     className="book-image"
//                   />
//                 </Card>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import Header from './header';  
import Navbar from './navbar';
import SearchForm from './searchform';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import '../../styles/landingpage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './starratings'; // Import StarRating component

// Explicitly import images
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';

const LandingPage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Array of image paths
  const bookImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
  ];

  useEffect(() => {
    // Fetch book data and their average ratings
    axios.get('http://localhost:5000/api/books/')
      .then((res) => {
        // Process book data and ratings
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
        {/* <h1>Welcome to the Book Review and Rating Site</h1> */}
        <div className="card-container">
          {filteredBooks.map((book) => {
            const randomImageIndex = Math.floor(Math.random() * bookImages.length);
            const selectedImage = bookImages[randomImageIndex];

            return (
              <Link to={`/books/${book.bookid}`} key={book.bookid}>
                <Card
                  title={book.title}
                  subTitle={`Author: ${Array.isArray(book.author) ? book.author.join(", ") : book.author}`}
                  footer={<span>First Published: {book.year || 'Unknown'}</span>}
                  className="book-card"
                >
                  <p>{book.language || 'No description available'}</p>
                  <img
                    src={selectedImage}
                    alt={book.title}
                    className="book-image"
                  />
                  {/* Display the average rating here */}
                  <div className="book-rating">
                    <StarRating rating={book.averageRating || 0} /> {/* Ensure the `averageRating` is available in the book data */}
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

export default LandingPage;


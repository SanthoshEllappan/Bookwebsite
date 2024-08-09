import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/bookdetailspage.css';
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';
import '../../styles/starratings.css'; // Import StarRating component
import StarRating from './starratings';

const Bookdetails: React.FC = () => {
  const { bookid } = useParams<{ bookid: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');

  const images = [image1, image2, image3, image4, image5];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get<Book>(`http://localhost:5000/api/books/${bookid}`);
        setBook(response.data[0]);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get<{ reviews: Review[] }>(`http://localhost:5000/api/books/books/${bookid}/reviews`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchBookDetails();
    fetchReviewDetails();
  }, [bookid]);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/books/books/${bookid}/review`, { rating, review: reviewText, username:localStorage.getItem("username") });
      alert('Review submitted successfully');
      const response = await axios.get<{ reviews: Review[] }>(`http://localhost:5000/api/books/books/${bookid}/reviews`);
      setReviews(response.data.reviews);
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating(reviews);

  return (
    <div className="book-details">
      {book ? (
        <div className="book-details-content">
          <div className="book-info">
            <div className="book-image-container">
              <img src={randomImage} alt={book.title} className="book-image1" />
            </div>
            <div className="book-description">
              <h2>{book.title}</h2>
              <h4>Author: {book.author}</h4>
              <p>{book.description || 'No description available'}</p>
              <div className="details">
                <p><strong>Country:</strong> {book.country || 'Unknown'}</p>
                <p><strong>Pages:</strong> {book.pages || 'N/A'}</p>
                <p><strong>Year:</strong> {book.year || 'Unknown'}</p>
                <p><strong>Language:</strong> {book.language || 'Unknown'}</p>
                {book.link && (
                  <p><a href={book.link} target="_blank" rel="noopener noreferrer">More Information</a></p>
                )}
                <div className="average-rating">
                  <h3>Average Rating:</h3>
                  <StarRating rating={averageRating} />
                </div>
              </div>
            </div>
          </div>
          <div className="review-section">
            <div className="review-form">
              <h3>Add a Review</h3>
              <div className="rating">
                <label>Rating: </label>
                <input type="number" value={rating} onChange={handleRatingChange} min="0" max="5" />
              </div>
              <div className="review">
                <label>Review: </label>
                <textarea value={reviewText} onChange={handleReviewChange}></textarea>
              </div>
              <button onClick={handleSubmit}>Submit Review</button>
            </div>
            <div className="existing-reviews">
              <h3>Existing Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <p><strong>User:</strong> {review.username}</p>
                    <p><strong>Rating:</strong> <StarRating rating={review.rating} /></p>
                    <p><strong>Review:</strong> {review.review}</p>
                    <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Bookdetails;

import React from 'react';

interface StarRatingProps {
  rating: number; // Expecting a number between 0 and 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Ensure the rating is within the expected range
  const roundedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 >= 0.5;
  
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        let starClass = 'star';
        if (starIndex <= fullStars) {
          starClass += ' filled';
        } else if (starIndex === fullStars + 1 && hasHalfStar) {
          starClass += ' half';
        } else {
          starClass += ' empty'; // Optional, for styling empty stars
        }
        return <span key={index} className={starClass}>★</span>;
      })}
    </div>
  );
};

export default StarRating;

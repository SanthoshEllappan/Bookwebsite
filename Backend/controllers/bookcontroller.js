const Book = require('../models/bookmodel.js');
const mongoose = require("mongoose")




// Add a new book
exports.addBook = async (req, res) => {
  try {
    // Create a new book document using the request body
    const newBook = new Book(req.body);

    // Save the new book to the database
    await newBook.save();

    // Respond with the newly created book
    res.status(201).json(newBook);
  } catch (error) {
    // Respond with an error message if something goes wrong
    res.status(400).json({ message: 'Error adding book', error });
  }
};



// // Add Book
// exports.addBook = async (req, res) => {
//     try {
//         const { title, author, description } = req.body;
//         const newBook = new Book({ title, author, description });
//         await newBook.save();
//         res.status(201).json({ message: 'Book added successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// Get Books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const {id}=req.params
        
        const book = await Book.find({bookid:id});
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book details:', error); // Log the error
        res.status(500).json({ error: 'Server error' });
    }
};



const books=require('./book.json')

exports.bulkupload = async(req,res)=>{
    try {
        // console.log(books)
        const result = await Book.insertMany(books);
        res.status(200).json({ message: 'Books uploaded successfully', result });
      } catch (error) {
        res.status(500).json({ message: 'Error uploading books', error });
      }
}

const Review = require('../models/review'); // Adjust the path as needed
const bookmodel = require('../models/bookmodel.js');

exports.addReview = async (req, res) => {
    const { rating, review, username } = req.body;
    const { bookid } = req.params; // Assuming the book ID is in the URL params
    console.log(bookid)

    try {
        // Find the book by ID
        const book = await Book.find({bookid:bookid});
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Create a new review
        const newReview = new Review({
            username,
            rating,
            review,
            bookid:bookid // Assuming user ID is available in `req.user`
        });

        // Save the review to the database
        await newReview.save();

        // Add the review to the book's reviews array
        // book.reviews.push(newReview._id);
        // await book.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getReviewsByBookId = async (req, res) => {
    const { bookid } = req.params; // Assuming the book ID is in the URL params

    try {
        // Find reviews by book ID
        const reviews = await Review.find({ bookid: bookid })// Optional: Populate user data if needed
        
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this book' });
        }

        // Respond with the reviews
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

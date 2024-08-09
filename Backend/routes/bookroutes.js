const express = require('express');
const { addBook, getBooks, bulkupload, getBookById, addReview, getReviewsByBookId } = require('../controllers/bookcontroller.js');
const authMiddleware = require('../middlewares/authmiddleware.js');
const router = express.Router();

router.post('/add', addBook);
router.get('/', getBooks);
router.post("/bulk",bulkupload)
router.get("/:id",getBookById)
router.post('/books/:bookid/review',addReview);
router.get('/books/:bookid/reviews', getReviewsByBookId);



module.exports = router;

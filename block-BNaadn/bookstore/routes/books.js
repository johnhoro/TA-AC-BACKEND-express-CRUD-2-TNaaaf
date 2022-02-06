var express = require("express");
var router = express.Router();

var Book = require(`../models/book`);
var Author = require(`../models/author`);
var Category = require(`../models/category`);

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   Book.find({}, (err, books) => {
//     if (err) return next(err);
//     res.render("books", { books: books });
//   });
// });

router.get("/", function (req, res, next) {
  Book.find({})
    .populate(`author`)
    .exec((err, books) => {
      if (err) return next(err);
      res.render("books", { books: books });
    });
});

// router.get(`/new`, (req, res, next) => {
//   res.render(`bookForm`);
// });

router.get(`/new`, (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    Category.find({}, (err, categories) => {
      if (err) return next(err);
      res.render(`bookForm`, { authors: authors, categories: categories });
    });
  });
});

router.post(`/`, (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    res.redirect(`/books`);
  });
});

router.get(`/:id`, (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, books) => {
    console.log(books);
    if (err) return next(err);
    res.render(`singleBook`, { books });
  });
});

router.get(`/:id/edit`, (req, res) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render(`updateBook`, { book });
  });
});

router.post(`/:id`, (req, res) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if (err) return next(err);
    res.redirect(`/books/` + id);
  });
});

router.get(`/:id/delete`, (req, res) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, req.body, (err, deletedBook) => {
    if (err) return next(err);
    res.redirect(`/books`);
  });
});

module.exports = router;

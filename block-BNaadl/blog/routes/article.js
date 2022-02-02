var express = require("express");
var router = express.Router();
var Article = require("../models/article");
/* GET users listing. */

router.get("/", (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("allArticles", { articles: articles });
  });
});

router.get("/new", (req, res) => {
  res.render("addArticles");
});

router.post("/", (req, res, next) => {
  var data = req.body;
  console.log(data);
  Article.create(data, (err, articleCreated) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("singleArticle", { article: article });
  });
});

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("updateArticles", { article: article });
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  var data = req.body;
  Article.findByIdAndUpdate(id, data, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, deletedArticle) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id/increment", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, likeIncre) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

router.get("/:id/decrement", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, likeDecre) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

module.exports = router;

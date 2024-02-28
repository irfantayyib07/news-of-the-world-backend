const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.route("/")
 .get(newsController.getNews)
 .post(newsController.createNews)
 .put(newsController.updateNews)
 .delete(newsController.deleteNews);

router.route("/:id")
 .get(newsController.getNews);

module.exports = router;

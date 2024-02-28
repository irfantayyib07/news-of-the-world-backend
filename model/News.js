const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
 category: String,
 country: String,
 articles: [
  {
   source: {
    id: String,
    name: String
   },
   author: String,
   title: String,
   description: String,
   url: String,
   urlToImage: String,
   publishedAt: Date,
   content: String,
  }
 ]
});

module.exports = mongoose.model("News", newsSchema); // exporting a model associated with schema
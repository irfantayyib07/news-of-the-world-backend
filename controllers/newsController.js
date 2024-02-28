const News = require("../model/News");

const getNews = async (req, res) => {
 const category = req.query.category || "general";
 const country = req.query.country || "us";
 const pageSize = +req.query.pageSize || 12;
 const page = +req.query.page || 1;

 const news = await News.find({ category, country });
 if (news.length === 0) return res.status(204).json({ message: "No news found in the current category-country combination!" });
 
 const filteredNews = news[0].articles.filter((item, i) => {
  // console.log(i <= (page * pageSize) - 1);
  return i <= (page * pageSize) - 1;
 }).slice(page === 1 ? 0 : page * pageSize - pageSize);

 const result = {
  status: "ok",
  totalResults: news[0].articles.length,
  articles: filteredNews
 }

 res.status(200).json(result);
};

const createNews = async (req, res) => {
 if (req?.body?.data?.articles.length === 0) {
  return res.status(400).json({ message: "No news found!" });
 }

 try {
  console.log(req.body.data);
  const result = await News.create(req.body.data);

  res.status(201).json(result);
 } catch (err) {
  console.log(err);
 }
};

const updateNews = async (req, res) => {
 if (!req?.body?.id) return res.status(400).json({ message: "ID is required!" });

 const news = await News.findOne({ _id: req.body.id }).exec();
 if (!news) return res.status(204).json({ message: `No news matches ID ${req.body.id}.` });

 if (req.body.firstname) news.firstname = req.body.firstname;
 if (req.body.lastname) news.lastname = req.body.lastname;
 const result = await news.save();
 res.json(result);
};

const deleteNews = async (req, res) => {
 if (!req?.body?.id) return res.status(400).json({ 'message': 'News ID required.' });

 const news = await News.findOne({ _id: req.body.id }).exec();
 if (!news) return res.status(204).json({ "message": `No news matches ID ${req.body.id}.` });
 const result = await news.deleteOne(); // { _id: req.body.id }
 res.json(result);
};

module.exports = {
 getNews,
 createNews,
 updateNews,
 deleteNews
};
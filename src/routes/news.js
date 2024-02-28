const News = require('../controllers/news')

module.exports = function(app) {

    app.route('/news').post(async (req, res, next) => {
        try {
            return res.json(await News.createNews(req));
        } catch (error) {
            next(error)
        }
    });

    app.route('/news/tour').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsByTourId(req));
        } catch (error) {
            next(error)   
        }
    });

    app.route('/news/match').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsByMatchId(req));
        } catch (error) {
            next(error)   
        }
    });

    app.route('/news/sport').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsBySportId(req));
        } catch (error) {
            next(error)   
        }
    });
};
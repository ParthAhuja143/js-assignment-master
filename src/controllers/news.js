const News = require('../models/news');

const createNews = async (req) => {
    const newsData = req.body;

    if(!newsData.entityName || !newsData.id || !newsData.title || !newsData.description){
        throw new Error('entityName, entityId, title and description are required');
    }

    if(newsData.entityName !== 'MATCH' && newsData.entityName !== 'TOUR' && newsData.entityName !== 'SPORT'){
        throw new Error('entityName must be either MATCH, TOUR or SPORT');
    }

    const entityCount = await News.countEntityId(newsData.entityName, newsData.id);
    const isValidEntity = entityCount[0].count > 0;
    if(!isValidEntity){
        throw new Error('Invalid entityName or entityId provided');
    }

    const newsId = await News.createNews(newsData);
    return { success: true, newsId: newsId.insertId };
}

const getNewsByMatchId = async (req) => {
    const matchId = req.query.id;

    if(!matchId){
        throw new Error('matchId is required');
    }

    const news = await News.getNewsByMatchId(matchId);
    return news;
};

const getNewsByTourId = async (req) => {
    const tourId = req.query.id;

    if(!tourId){
        throw new Error('tourId is required');
    }

    const news = await News.getNewsByTourId(tourId);
    return news;
}

const getNewsBySportId = async (req) => {  
    const sportId = req.query.id;

    if(!sportId){
        throw new Error('sportId is required');
    }

    const news = await News.getNewsBySportId(sportId);
    return news;
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId,
}
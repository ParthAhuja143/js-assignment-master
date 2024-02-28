const { cache } = require('../cache');
const Tour = require('../models/tour');   

const getAllTours = async () => {
    return await Tour.getAllTours();
}

/*
 * Endpoint optimization
 * 1. Caching
 * READ-THROUGH LRU CACHE IMPLEMENTATION
 * Assuming that the matches are not written as per current implementation
 * 
 * 2. Indexing
*/
const getMatchesByTourName = async params => {
    const { name } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }

    const key = `getMatchesByTourName-${name}`

    if(cache.has(key)){
        return cache.get(key);
    }

    const dbRes = await Tour.getMatchesByTourName(params);

    cache.set(key, dbRes);

    return dbRes;
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}
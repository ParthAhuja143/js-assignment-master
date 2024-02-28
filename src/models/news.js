const mysql = require("../lib/mysql");

const createNews = async requestBody => {
    const statement = 'insert into news (title, description, entityName, entityID) values (?, ?, ?, ?);';
    const parameters = [requestBody.title, requestBody.description, requestBody.entityName, requestBody.id];
    return await mysql.query(statement, parameters);
}

const getNewsByMatchId = async params => {
    const statement = 'select * from news where entityName = \'MATCH\' and entityID = ?';
    const parameters = [params];
    return await mysql.query(statement, parameters);
};

const getNewsByTourId = async params => {
    const statement = 'select * from news where entityName=\'TOUR\' and entityID = ? union all select * from news where entityName=\'Match\' and entityID in (select id from matches where tourId= ? );';
    const parameters = [params, params];
    return await mysql.query(statement, parameters);
};

const getNewsBySportId = async params => {
    const statement = 'select * from news where entityName=\'SPORT\' and entityID = ? union all select * from news where entityName=\'TOUR\' and entityID in (select id from tours where sportId= ? ) union all select * from news where entityName=\'MATCH\' and entityID in (select id from matches where tourId in (select id from tours where sportId= ? ));';
    const parameters = [params, params, params];
    return await mysql.query(statement, parameters);
};

const countEntityId = async (entityName, entityId, callback) => {
    let tableName;
    switch (entityName) {
        case 'SPORT':
            tableName = 'sports';
            break;
        case 'TOUR':
            tableName = 'tours';
            break;
        case 'MATCH':
            tableName = 'matches';
            break;
        default:
            return callback(null, false); // Invalid entityName
    }
    const query = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
    const parameters = [entityId];  
    return await mysql.query(query, parameters);
};

/**
Problem 3
Requirement: News Support for Matches and Tours
Functional Requirements:
    1. News can be created for a match or a tour.
    2. Each news created for a match also belongs to the corresponding tour.
    3. Each news created for a tour also belongs to the corresponding sport.
Technical Requirements:
    1. Create an endpoint to create news.
    2. Create an endpoint to fetch news by match id
    3. Create an endpoint to fetch news by tour id
    4. Create an endpoint to fetch news by sport id
 */

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId, 
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId,
    countEntityId: countEntityId
}
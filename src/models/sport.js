const mysql = require('../lib/mysql');

const getAllSportsToursAndMatches = async () => {
    //Modify the endpoint /sport/tour/match to also return match's id, startTime and format
    const statement = 'select m.id as matchId, m.startTime as matchStartTime, m.format as matchFormat, s.name as sportName, t.name as tourName, m.name as matchName ' +
        'from matches m inner join tours t on m.tourId = t.id ' +
        'inner join sports s on t.sportId = s.id';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches
}
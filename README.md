# js-assignment

## Introduction

This repository contains an assignment focused on improving the performance and functionality of a Node.js service. Here's a breakdown of the contents:

- `instructions.txt`: Instructions for running the service.
- `guidelines.txt`: Guidelines to follow while solving and submitting the assignment.
- `problem-statement.txt`: Problem statements to be solved.

## Solutions

### Problem 1

**Problem Statement**

Endpoint `/tour/matches` returns all the matches for a given tour name. The endpoint latency increases linearly with the number of tours. Modify the endpoint to increase the performance.

**Solution**

1. Indexing on `matches.tourId` and `tour.name` (not required for `tour.id` as it is already a primary key).
2. Using an LRU Read-through cache for reducing DB calls (We are using a Read-through cache as we don't have an endpoint to write right now so a Read Through Cache strategy would work best for the current system because we do not have updations in the tournament or matches).

### Problem 2

**Problem Statement**

Modify the endpoint `/sport/tour/match` to also return match's id, startTime, and format.

**Solution**

1. Updating Query to include the required columns (`matchID`, `matchStartTime`, and `matchFormat`).

### Problem 3

**Problem Statement**

Requirement: News Support for Matches and Tours
Functional Requirements:
   1. News can be created for a match or a tour.
   2. Each news created for a match also belongs to the corresponding tour.
   3. Each news created for a tour also belongs to the corresponding sport.
Technical Requirements:
   1. Create an endpoint to create news.
   2. Create an endpoint to fetch news by match id - return match news
   3. Create an endpoint to fetch news by tour id - return match and tour news
   4. Create an endpoint to fetch news by sport id - return tour news, sport news, and match news

**Solution**

Schema for News is:

```sql
CREATE TABLE IF NOT EXISTS mydb.news (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    entityName ENUM ('SPORT', 'MATCH', 'TOUR') NOT NULL,
    entityID INT NOT NULL,
    INDEX idx_news_entity (entityName, entityID)
);
```

where `entityID` is the ID for the entity (`MATCH`, `SPORT`, `TOUR`) and `indexing` is done on (`entityName` and `entityID`).

and the required routes, controllers, and models are created.

***Endpoints -***
1. `POST /news` to create news.
2. `GET /news/match?id=matchID` to get news related to matches.
3. `GET /news/tour?id=tourID` to get news related to tours and matches in the tournament.
4. `GET /news/sport?id=sportID` to get news related to the sport, tournaments in the sport, and matches.

**Potential Solution**
The schema can be redesigned to have `tourID` ,`matchID`, and `sportID` as Foreign keys but that would hinder maintainability and increase development time for any changes to the route in the future.


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

1. Indexing on `matches.tourId` and `tour.name`.
2. Using an LRU Read-through cache for reducing DB calls (We are using Read-through cache as we don't have an endpoint to write right now.)

### Problem 2

**Problem Statement**

Modify the endpoint `/sport/tour/match` to also return match's id, startTime, and format.

**Solution**

1. Updating Query to include the required columns.

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
   4. Create an endpoint to fetch news by sport id - return tour news sport news and match

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


where `entityID` is the ID for the entity (`MATCH`, `SPORT`, `TOUR`).

and the required routes, controllers, and models are created.

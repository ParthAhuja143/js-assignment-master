const {LRUCache} = require('lru-cache');

const cache = new LRUCache({
    max: 500,
    maxSize: 5000,
    ttl: 1000 * 60 * 5,
    allowStale: false,
    updateAgeOnGet: true,
    updateAgeOnHas: false,
    sizeCalculation: (value, key) => {
        return 1
    },
});

exports.cache = cache;
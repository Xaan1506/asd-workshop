const cache = {};

const TTL = 60 * 1000;


function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cachedData = cache[key];

    if (cachedData) {

        const age = Date.now() - cachedData.createdAt;

        if (age < TTL) {

            res.set("X-Cache", "HIT");

            return res.json(cachedData.data);
        }

        delete cache[key];
    }

    res.set("X-Cache", "MISS");

    const originalJson = res.json.bind(res);

    res.json = (data) => {

        cache[key] = {
            data: data,
            createdAt: Date.now()
        };

        originalJson(data);
    };

    next();
}


function invalidateCache() {

    for (const key in cache) {
        delete cache[key];
    }
}


module.exports = {
    cacheMiddleware,
    invalidateCache
};
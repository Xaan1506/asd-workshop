const express = require("express");

const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const {
    cacheMiddleware,
    invalidateCache
} = require("../middleware/cacheMiddleware");


// GET routes → use cache

router.get(
    "/",
    cacheMiddleware,
    getProducts
);

router.get(
    "/:id",
    cacheMiddleware,
    getProductById
);


// POST → create product → invalidate cache

router.post("/", async (req, res, next) => {
    try {
        await createProduct(req, res);

        if (res.statusCode >= 200 && res.statusCode < 300) {
            invalidateCache();
        }
    } catch (err) {
        next(err);
    }
});


// PUT → update product → invalidate cache

router.put(
    "/:id",
    async (req, res, next) => {

        try {

            await updateProduct(req, res);

            invalidateCache();

        } catch (err) {

            next(err);

        }

    }
);


// PATCH → update product → invalidate cache

router.patch(
    "/:id",
    async (req, res, next) => {

        try {

            await updateProduct(req, res);

            invalidateCache();

        } catch (err) {

            next(err);

        }

    }
);


// DELETE → delete product → invalidate cache

router.delete(
    "/:id",
    async (req, res, next) => {

        try {

            await deleteProduct(req, res);

            invalidateCache();

        } catch (err) {

            next(err);

        }

    }
);


module.exports = router;
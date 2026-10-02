const {
    readProducts,
    writeProducts
} = require("../database/productDatabase");


async function getAllProducts() {
    const products = await readProducts();

    return products;
}


async function getProductById(id) {
    const products = await readProducts();

    const product = products.find((item) => {
        return item.id === Number(id);
    });

    return product;
}


async function createProduct(productData) {
    const products = await readProducts();

    const newProduct = {
        id: products.length + 1,
        ...productData
    };

    products.push(newProduct);

    await writeProducts(products);

    return newProduct;
}


async function updateProduct(id, productData) {
    const products = await readProducts();

    const index = products.findIndex((item) => {
        return item.id === Number(id);
    });

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...productData
    };

    await writeProducts(products);

    return products[index];
}


async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex((item) => {
        return item.id === Number(id);
    });

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1)[0];

    await writeProducts(products);

    return deletedProduct;
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
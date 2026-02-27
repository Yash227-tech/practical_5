const { readData, writeData } = require('../data/db');



exports.getAllProducts = (req, res, next) => {
    try {
        const data = readData();
        let products = data.products;

        if (req.query.category) {
            products = products.filter(
                p => p.category.toLowerCase() === req.query.category.toLowerCase()
            );
        }

        res.json({ success: true, count: products.length, data: products });
    } catch (err) {
        next(err);
    }
};



exports.getProductById = (req, res, next) => {
    try {
        const data = readData();
        const product = data.products.find(p => p.id === parseInt(req.params.id));

        if (!product) {
            const error = new Error(`Product with ID ${req.params.id} not found`);
            error.status = 404;
            throw error;
        }

        res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};



exports.createProduct = (req, res, next) => {
    try {
        const data = readData();
        const { name, category, price, originalPrice, image, badge, description } = req.body;

        const newProduct = {
            id: data.products.length > 0
                ? Math.max(...data.products.map(p => p.id)) + 1
                : 1,
            name: name.trim(),
            category: category.trim(),
            price,
            originalPrice: originalPrice || null,
            image: image || 'images/placeholder.png',
            badge: badge || null,
            description: description || ''
        };

        data.products.push(newProduct);
        writeData(data);

        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        next(err);
    }
};



exports.updateProduct = (req, res, next) => {
    try {
        const data = readData();
        const index = data.products.findIndex(p => p.id === parseInt(req.params.id));

        if (index === -1) {
            const error = new Error(`Product with ID ${req.params.id} not found`);
            error.status = 404;
            throw error;
        }

        const { name, category, price, originalPrice, image, badge, description } = req.body;

        data.products[index] = {
            ...data.products[index],
            name: name.trim(),
            category: category.trim(),
            price,
            originalPrice: originalPrice !== undefined ? originalPrice : data.products[index].originalPrice,
            image: image || data.products[index].image,
            badge: badge !== undefined ? badge : data.products[index].badge,
            description: description !== undefined ? description : data.products[index].description
        };

        writeData(data);

        res.json({ success: true, data: data.products[index] });
    } catch (err) {
        next(err);
    }
};



exports.deleteProduct = (req, res, next) => {
    try {
        const data = readData();
        const index = data.products.findIndex(p => p.id === parseInt(req.params.id));

        if (index === -1) {
            const error = new Error(`Product with ID ${req.params.id} not found`);
            error.status = 404;
            throw error;
        }

        const deleted = data.products.splice(index, 1)[0];
        writeData(data);

        res.json({ success: true, message: 'Product deleted', data: deleted });
    } catch (err) {
        next(err);
    }
};

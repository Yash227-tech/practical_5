const { readData, writeData } = require('../data/db');



exports.getCart = (req, res, next) => {
    try {
        const data = readData();
        const userId = req.params.userId;
        const cartItems = data.carts[userId] || [];

        const enrichedItems = cartItems.map(item => {
            const product = data.products.find(p => p.id === item.productId);
            return { ...item, product: product || null };
        }).filter(item => item.product);

        let subtotal = 0;
        enrichedItems.forEach(item => {
            subtotal += item.product.price * item.quantity;
        });
        const tax = subtotal * 0.08;
        const shipping = subtotal > 5000 ? 0 : 500;
        const total = subtotal + tax + shipping;

        res.json({
            success: true,
            data: {
                items: enrichedItems,
                totals: { subtotal, tax, shipping, total }
            }
        });
    } catch (err) {
        next(err);
    }
};



exports.addToCart = (req, res, next) => {
    try {
        const data = readData();
        const userId = req.params.userId;
        const { productId, quantity } = req.body;

        const product = data.products.find(p => p.id === productId);
        if (!product) {
            const error = new Error(`Product with ID ${productId} not found`);
            error.status = 404;
            throw error;
        }

        if (!data.carts[userId]) {
            data.carts[userId] = [];
        }

        const existingItem = data.carts[userId].find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            data.carts[userId].push({ productId, quantity });
        }

        writeData(data);

        res.status(201).json({
            success: true,
            message: `Added ${quantity} × ${product.name} to cart`,
            data: data.carts[userId]
        });
    } catch (err) {
        next(err);
    }
};



exports.updateCartItem = (req, res, next) => {
    try {
        const data = readData();
        const userId = req.params.userId;
        const productId = parseInt(req.params.productId);
        const { quantity } = req.body;

        if (!quantity || typeof quantity !== 'number' || quantity < 1) {
            const error = new Error('Quantity must be a positive integer');
            error.status = 400;
            throw error;
        }

        if (!data.carts[userId]) {
            const error = new Error('Cart not found');
            error.status = 404;
            throw error;
        }

        const item = data.carts[userId].find(item => item.productId === productId);
        if (!item) {
            const error = new Error(`Product ${productId} not found in cart`);
            error.status = 404;
            throw error;
        }

        item.quantity = quantity;
        writeData(data);

        res.json({ success: true, data: data.carts[userId] });
    } catch (err) {
        next(err);
    }
};



exports.removeFromCart = (req, res, next) => {
    try {
        const data = readData();
        const userId = req.params.userId;
        const productId = parseInt(req.params.productId);

        if (!data.carts[userId]) {
            const error = new Error('Cart not found');
            error.status = 404;
            throw error;
        }

        const index = data.carts[userId].findIndex(item => item.productId === productId);
        if (index === -1) {
            const error = new Error(`Product ${productId} not found in cart`);
            error.status = 404;
            throw error;
        }

        data.carts[userId].splice(index, 1);
        writeData(data);

        res.json({
            success: true,
            message: 'Item removed from cart',
            data: data.carts[userId]
        });
    } catch (err) {
        next(err);
    }
};

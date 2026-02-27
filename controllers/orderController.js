const { readData, writeData } = require('../data/db');



exports.placeOrder = (req, res, next) => {
    try {
        const data = readData();
        const { userId, shippingAddress, paymentMethod } = req.body;

        const cartItems = data.carts[userId] || [];
        if (cartItems.length === 0) {
            const error = new Error('Cannot place order with an empty cart');
            error.status = 400;
            throw error;
        }

        const orderItems = cartItems.map(item => {
            const product = data.products.find(p => p.id === item.productId);
            if (!product) return null;
            return {
                productId: item.productId,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                total: product.price * item.quantity
            };
        }).filter(Boolean);

        if (orderItems.length === 0) {
            const error = new Error('No valid products found in cart');
            error.status = 400;
            throw error;
        }

        const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
        const tax = subtotal * 0.08;
        const shipping = subtotal > 5000 ? 0 : 500;
        const total = subtotal + tax + shipping;

        const order = {
            id: data.orders.length > 0
                ? Math.max(...data.orders.map(o => o.id)) + 1
                : 1,
            orderNumber: 'HW-' + Date.now().toString().slice(-6),
            userId: parseInt(userId),
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totals: { subtotal, tax, shipping, total },
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };

        data.orders.push(order);
        data.carts[userId] = [];
        writeData(data);

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};



exports.getUserOrders = (req, res, next) => {
    try {
        const data = readData();
        const userId = parseInt(req.params.userId);

        const userOrders = data.orders.filter(o => o.userId === userId);

        res.json({
            success: true,
            count: userOrders.length,
            data: userOrders
        });
    } catch (err) {
        next(err);
    }
};



exports.getOrderById = (req, res, next) => {
    try {
        const data = readData();
        const order = data.orders.find(o => o.id === parseInt(req.params.orderId));

        if (!order) {
            const error = new Error(`Order with ID ${req.params.orderId} not found`);
            error.status = 404;
            throw error;
        }

        res.json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

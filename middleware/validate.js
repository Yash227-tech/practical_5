function validateProduct(req, res, next) {
    const { name, category, price } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Product name is required and must be at least 2 characters');
    }
    if (!category || typeof category !== 'string' || category.trim().length === 0) {
        errors.push('Category is required');
    }
    if (price === undefined || typeof price !== 'number' || price <= 0) {
        errors.push('Price must be a positive number');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
}

function validateUser(req, res, next) {
    const { name, email, password } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Name is required and must be at least 2 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('A valid email address is required');
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('A valid email address is required');
    }
    if (!password || typeof password !== 'string') {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
}

function validateCartItem(req, res, next) {
    const { productId, quantity } = req.body;
    const errors = [];

    if (!productId || typeof productId !== 'number' || !Number.isInteger(productId)) {
        errors.push('productId must be a valid integer');
    }
    if (!quantity || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1) {
        errors.push('Quantity must be a positive integer');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
}

function validateOrder(req, res, next) {
    const { userId, shippingAddress, paymentMethod } = req.body;
    const errors = [];

    if (!userId) {
        errors.push('userId is required');
    }

    if (!shippingAddress || typeof shippingAddress !== 'object') {
        errors.push('shippingAddress is required');
    } else {
        const { firstName, lastName, address, city, zip, phone } = shippingAddress;
        if (!firstName || firstName.trim().length === 0) errors.push('First name is required');
        if (!lastName || lastName.trim().length === 0) errors.push('Last name is required');
        if (!address || address.trim().length === 0) errors.push('Street address is required');
        if (!city || city.trim().length === 0) errors.push('City is required');
        if (!zip || zip.trim().length === 0) errors.push('ZIP code is required');
        if (!phone || phone.trim().length === 0) errors.push('Phone number is required');
    }

    const validMethods = ['card', 'paypal', 'cod'];
    if (!paymentMethod || !validMethods.includes(paymentMethod)) {
        errors.push('Payment method must be one of: card, paypal, cod');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
}

module.exports = {
    validateProduct,
    validateUser,
    validateLogin,
    validateCartItem,
    validateOrder
};

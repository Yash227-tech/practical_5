const CART_KEY = 'HotWheels_cart';
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
saveCart(cart);
    return cart;
}
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    return cart;
}
function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
if (item) {
        if (quantity <= 0) {
            return removeFromCart(productId);
        }
        item.quantity = quantity;
        saveCart(cart);
    }
return cart;
}
function getCartTotal() {
    const cart = getCart();
    let subtotal = 0;
cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });
const tax = subtotal * 0.08; 
    const shipping = subtotal > 5000 ? 0 : 500;
    const total = subtotal + tax + shipping;
return {
        subtotal,
        tax,
        shipping,
        total
    };
}
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
}
function getCartWithDetails() {
    const cart = getCart();
    return cart.map(item => {
        const product = getProductById(item.productId);
        return {
            ...item,
            product
        };
    }).filter(item => item.product); 
}
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.clearCart = clearCart;
window.getCartWithDetails = getCartWithDetails;

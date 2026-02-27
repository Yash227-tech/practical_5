const products = [
    {
        id: 1,
        name: "Ferrari SF90 Stradale",
        category: "Sports Cars",
        price: 4999,
        originalPrice: 6999,
        image: "images/ferrari-sf90-stradale.png",
        badge: "Hot",
        description: "Premium die-cast Ferrari with opening doors and detailed interior"
    },
    {
        id: 2,
        name: "Lamborghini Huracán",
        category: "Sports Cars",
        price: 4499,
        originalPrice: null,
        image: "images/lamborghini-huracan.png",
        badge: null,
        description: "Detailed Lamborghini model with authentic styling"
    },
    {
        id: 3,
        name: "Porsche 911 GT3",
        category: "Sports Cars",
        price: 3999,
        originalPrice: 5499,
        image: "images/porsche-911-gt3.png",
        badge: "Sale",
        description: "Classic Porsche design in stunning detail"
    },
    {
        id: 4,
        name: "McLaren P1",
        category: "Supercars",
        price: 5999,
        originalPrice: null,
        image: "images/mclaren-p1.png",
        badge: "New",
        description: "Hypercar perfection in miniature form"
    },
    {
        id: 5,
        name: "Ford Mustang GT",
        category: "Muscle Cars",
        price: 3499,
        originalPrice: 4499,
        image: "images/ford-mustang-gt.png",
        badge: "Best Seller",
        description: "American muscle icon with roaring details"
    },
    {
        id: 6,
        name: "BMW M4 Competition",
        category: "Sports Cars",
        price: 4299,
        originalPrice: null,
        image: "images/bmw-m4.png",
        badge: null,
        description: "German engineering excellence"
    },
    {
        id: 8,
        name: "Aston Martin DB11",
        category: "Luxury Cars",
        price: 5499,
        originalPrice: null,
        image: "images/aston-martin-db11.png",
        badge: "Premium",
        description: "British luxury and sophistication"
    },
    {
        id: 10,
        name: "Bugatti Chiron",
        category: "Hypercars",
        price: 7999,
        originalPrice: 9999,
        image: "images/bugatti-chiron.png",
        badge: "Limited",
        description: "The ultimate hypercar experience"
    }
];
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}
function formatPrice(price) {
    return `₹${Math.round(price).toLocaleString('en-IN')}`;
}
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}
function updateUserDisplay() {
    const userBtn = document.querySelector('.nav-user');
    if (!userBtn) return;
const currentUser = getCurrentUser();
    if (currentUser) {
        userBtn.innerHTML = `👤 ${currentUser.name.split(' ')[0]}`;
        userBtn.href = '#';
        userBtn.onclick = (e) => {
            e.preventDefault();
            showLogoutModal();
        };
    } else {
        userBtn.innerHTML = '👤 Login';
        userBtn.href = 'login.html';
        userBtn.onclick = null;
    }
}
function showLogoutModal() {
let modal = document.getElementById('logout-modal');
if (!modal) {
modal = document.createElement('div');
        modal.id = 'logout-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal" style="max-width: 360px; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">👋</div>
                <h3 style="margin-bottom: 0.5rem;">Logout</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                    Are you sure you want to logout?
                </p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-ghost" style="flex: 1;" onclick="closeLogoutModal()">
                        Cancel
                    </button>
                    <button class="btn btn-accent" style="flex: 1;" onclick="confirmLogout()">
                        Logout
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLogoutModal();
            }
        });
    }
setTimeout(() => modal.classList.add('active'), 10);
}
function closeLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}
function confirmLogout() {
    logout();
    closeLogoutModal();
    window.location.reload();
}
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    updateCartBadge();
    updateUserDisplay();
});
window.products = products;
window.getProductById = getProductById;
window.formatPrice = formatPrice;
window.updateCartBadge = updateCartBadge;
window.updateUserDisplay = updateUserDisplay;
window.showLogoutModal = showLogoutModal;
window.closeLogoutModal = closeLogoutModal;
window.confirmLogout = confirmLogout;

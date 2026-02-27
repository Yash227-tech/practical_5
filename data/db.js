const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'store.json');

function readData() {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        return { products: [], users: [], carts: {}, orders: [] };
    }
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readData, writeData };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUserId = exports.isValidProductId = exports.isValidQuantity = exports.CART_VALIDATION = void 0;
// Validation helpers
// Validation constants
exports.CART_VALIDATION = {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 100,
    MAX_TOTAL_QUANTITY: 100
};
const isValidQuantity = (quantity) => {
    return Number.isInteger(quantity) &&
        quantity >= exports.CART_VALIDATION.MIN_QUANTITY &&
        quantity <= exports.CART_VALIDATION.MAX_QUANTITY;
};
exports.isValidQuantity = isValidQuantity;
const isValidProductId = (productId) => {
    return typeof productId === 'string' && productId.length > 0;
};
exports.isValidProductId = isValidProductId;
const isValidUserId = (userId) => {
    return typeof userId === 'string' && userId.length > 0;
};
exports.isValidUserId = isValidUserId;

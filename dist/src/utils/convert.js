"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToBaseUnit = exports.convertToPurchasedUnit = exports.convertSellingUnit = exports.convertStockToBaseUnit = void 0;
function convertStockToBaseUnit(purchasedStock, purchasedUnitValue, baseUnitValue) {
    return purchasedStock * purchasedUnitValue * baseUnitValue;
}
exports.convertStockToBaseUnit = convertStockToBaseUnit;
function convertSellingUnit(product, unit, quantity) {
    if (unit !== product.baseUnit &&
        product.purchasedUnit !== product.baseUnit) {
        return quantity * product.baseUnitValue;
    }
    return quantity;
}
exports.convertSellingUnit = convertSellingUnit;
function convertToPurchasedUnit(quantity, baseUnitValue) {
    return quantity / baseUnitValue;
}
exports.convertToPurchasedUnit = convertToPurchasedUnit;
function convertToBaseUnit(quantity, baseUnitValue, purchasedUnitValue) {
    return quantity * purchasedUnitValue * baseUnitValue;
}
exports.convertToBaseUnit = convertToBaseUnit;
//# sourceMappingURL=convert.js.map
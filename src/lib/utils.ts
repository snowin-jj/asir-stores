export function calculateTaxAmount(amount: number, taxValue: number) {
    return amount + amount * (taxValue / 100);
}


export function calculateSellerProductsSoldTotalAmount(product) {
    let totalOrderSubAmount = 0.0;
    const { products } = product;

    for (let i in products) {
        if (products[i].percentageOff) {
            const percentageOffPrice = (products[i].percentageOff / 100) * parseFloat(products[i].productPrice)
            const newPrice = parseFloat(products[i].productPrice) - percentageOffPrice ;
            totalOrderSubAmount += newPrice * products[i].productQty;
        }  else {
            totalOrderSubAmount += products[i].productPrice * products[i].productQty;
        }
    }

    return totalOrderSubAmount.toFixed(2, 10);   
}
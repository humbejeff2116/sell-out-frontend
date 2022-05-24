
export function getTotalOrderAmount(orderedProducts) {

    let totalOrderAMount = 0.00;
    let i = 0;
    let len = orderedProducts.length;
    let newPrice;

    for (i; i < len; i++) {

        const productPrice = parseFloat(orderedProducts[i].productPrice);
        const productQuantity = parseFloat(orderedProducts[i].productQty);

        if (isNaN(productPrice) || isNaN(productQuantity)) {

            throw new Error("unexpected data type in getTotalOrderAmount function");

        }

        if (orderedProducts[i].percentageOff) {

            const percentOffPrice = (parseFloat(orderedProducts[i].percentageOff )/ 100) * parseFloat(productPrice)
            newPrice = productPrice - percentOffPrice;
            totalOrderAMount += newPrice * productQuantity;

        } else {

            totalOrderAMount += productPrice * productQuantity;

        }
       

    }

    return totalOrderAMount.toFixed(2, 10);

}

export function getOrderSubAmount({percentageOff, productPrice, productQty}) {

    let totalOrderAMount = 0.00;
    let newPrice;

    if (percentageOff) {

        const percentOffPrice = (parseFloat(percentageOff )/ 100) * parseFloat(productPrice)
        newPrice = parseFloat(productPrice) - percentOffPrice;
        totalOrderAMount += newPrice * parseFloat(productQty);

        return totalOrderAMount.toFixed(2, 10);

    } 

    totalOrderAMount += parseFloat(productPrice) * parseFloat(productQty);

    return totalOrderAMount.toFixed(2, 10);
    
}

function addToCartActionPayload(
    productId,
    sellerId,
    sellerName,
    sellerEmail, 
    productName,
    productImages,
    productPrice,
    productQty,productSize
) {
    return ({
        sellerId,
        sellerName,
        sellerEmail,
        productId,
        productName,
        productImages,
        productPrice,
        productQty,
        productSize
    });
}

function removeFromCartActionPayload(sellerName, productId) {
    return ({
        sellerName,
        productId
    })
}

function addCartProductQuantityActionPayload(sellerName, productId, productQty) {
    return ({
        sellerName,
        productId,
        productQty,
    })
}

function reduceCartProductActionPayload(sellerName, productId, productQty) {
    return ({
        sellerName,
        productId,
        productQty
    })
}

export {
    reduceCartProductActionPayload,
    addCartProductQuantityActionPayload,
    removeFromCartActionPayload,
    addToCartActionPayload
}
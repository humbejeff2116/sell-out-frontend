
function addToCartActionPayload(product, productQty, productSize) {
    const {
        productId,
        userId,
        userName,
        userEmail, 
        productName,
        productImages,
        productPrice,
        // productQty,
        // productSize 
    } = product;
    return ({
        userId,
        userName,
        userEmail,
        productId,
        productName,
        productImages,
        productQty,
        productPrice,
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
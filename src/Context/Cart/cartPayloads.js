
function addToCartActionPayload(product, productQty, productSize="") {
    const {
        productId,
        userId,
        userName,
        userEmail,
        userProfilePicture, 
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
        userProfilePicture,
        productId,
        productName,
        productImages,
        productQty,
        productPrice,
        productSize
    });
}

function removeFromCartActionPayload(sellerEmail, productId) {
    return ({
        sellerEmail,
        productId
    })
}

function addCartProductQuantityActionPayload(sellerEmail, productId, productQty) {
    return ({
        sellerEmail,
        productId,
        productQty,
    })
}

function reduceCartProductActionPayload(sellerEmail, productId, productQty) {
    return ({
        sellerEmail,
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

function addToCartActionPayload(product, productQty, productSize="") {

    const {
        productId,
        userId,
        userName,
        userEmail,
        userProfileImage, 
        productName,
        productImages,
        productPrice,
        percentageOff,
        // productQty,
        // productSize 
    } = product;

    return ({
        userId,
        userName,
        userEmail,
        userProfileImage,
        productId,
        productName,
        productImages,
        productQty,
        productPrice,
        percentageOff,
        productSize
    })

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
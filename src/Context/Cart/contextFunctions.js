
import { calculateSellerProductsSoldTotalAmount } from './Lib/library';


async function addProductToCart(state = [], action) {
    const {
        userName,
        userId,
        userEmail,
        userProfileImage,
        productId,
        productName,
        productImages,
        productPrice,
        percentageOff,
        productQty,
        productSize,
    } = action
    let sellerExist = false;
    let sellerProductAlreadyExist = false;
    let sellerProducts;
    let i = 0;
    let len = state.length;

    if (state.length) {
        for (i; i < len; i++) {
            if ( state[i].sellerEmail === userEmail) {
                sellerExist = true;
                sellerProducts = state[i].products;
                break;
            } 
        }

        if (sellerExist) {
            let i = 0
            let len = sellerProducts.length

            for (i; i < len; i++) {
                if (sellerProducts[i].productId === productId) {
                    sellerProductAlreadyExist = true;
                    sellerProducts[i].productQty += productQty;
                    return state;
                }
            }

            if (!sellerProductAlreadyExist) {
                sellerProducts[sellerProducts.length] = { 
                    productId,
                    productName,
                    productImages,
                    productPrice,
                    percentageOff,
                    productQty,
                    productSize,
                }

                return state;
            }
        }
    }

    // add new cart product if seller does not exist
    return [...state, { 
        sellerName: userName,
        sellerId: userId,
        sellerEmail: userEmail,
        sellerProfileImage: userProfileImage,
        productsDelivered: false,
        products:[{
            productId,
            productName,
            productImages,
            productPrice,
            percentageOff,
            productQty,
            productSize,  
        }],
    }]
}

async function removeProductFromCart(state = [], action) {
    const { productId, sellerEmail } = action;
    let sellerProducts;
    let sellerExist = false;
    let i = 0;
    let len = state.length 

    for (i; i < len; i++) {
        if (state[i].sellerEmail === sellerEmail) {
            sellerExist = true;
            sellerProducts = state[i].products;
            break;
        }   
    }
    //  return initial state if seller does not exist
    if (!sellerExist || !sellerProducts.length > 0) {
        return state;
    }
    //   filter product with product id
    const newSellerProducts = sellerProducts.filter(product => {
        return product.productId !== productId;
    })
    //  loop through the cart state and attach the new filtered seller product
    if (newSellerProducts.length < 1) {
        const newState = state.filter(product => {
            return product.sellerEmail !== sellerEmail
        })

        return newState;
    }

    for (i = 0; i < len; i++) {
        if (state[i].sellerEmail === sellerEmail) {
            state[i].products = newSellerProducts;
            break;
        }   
    }

    return state;
}
    
async function addCartProductQuantity(state = [], action) {
    const { productId, sellerEmail, updatedProductQuantity } = action;
    let sellerProducts;
    let sellerExist = false;
    let i = 0;
    let len = state.length

    if (updatedProductQuantity < 1) return state;
    
    for (i; i < len; i++) {
        if (state[i].sellerEmail === sellerEmail) {
            sellerExist = true;
            sellerProducts = state[i].products;
            break;
        }
    }

    if (!sellerExist || !sellerProducts.length) {
        return state;
    }
    //   loop through seller products and add quantity
    for (i = 0; i < sellerProducts.length; i++) {
        if (sellerProducts[i].productId === productId) {
            sellerProducts[i].productQty += updatedProductQuantity || 1;
            break;
        }
    }

    return state;
}
    
async function reduceCartProductQuantity(state=[], action) {
    const { productId, sellerEmail, productQuantity } = action;
    let sellerProducts;
    let sellerExist = false;
    let i = 0;
    let len = state.length;

    if (productQuantity < 1) return state;

    for (i; i < len; i++) {
        if (state[i].sellerEmail === sellerEmail) {
            sellerExist = true;
            sellerProducts = state[i].products;
            break;
        } 
    }

    if (!sellerExist || !sellerProducts.length)  return state;
    //   loop through seller products and reduce quantity
    for (i = 0; i < sellerProducts.length; i++) {
        if ((sellerProducts[i].productId === productId) && !(productQuantity > sellerProducts[i].productQty)) { 
            if( sellerProducts[i].productQty <= 1) {
                break;
            }

            sellerProducts[i].productQty -= 1;
            break;
        }
    }

    return state;
}
    
async function clearCart(state = [], action) {
    return state = [];
}
    
function calculateCartTotalPrice(state = []) {
    const allCartProducts = state.flatMap(({ products }) => products); 
    let totalCartSum = 0.00;
    let i = 0;
    let len = allCartProducts.length

    for (i; i < len; i++) {
        if (allCartProducts[i].percentageOff) {
            const percentOffPrice = (allCartProducts[i].percentageOff / 100) * parseFloat(allCartProducts[i].productPrice)
            const newPrice = parseFloat(allCartProducts[i].productPrice) - percentOffPrice;
            totalCartSum += newPrice * allCartProducts[i].productQty;
        } else {
            totalCartSum += allCartProducts[i].productPrice * allCartProducts[i].productQty;
        }  
    }

    return totalCartSum.toFixed(2, 10);
}
    
    

function createSellerPaymentData(state = [], buyer) {
    const sellersProductSoldTotalAmount = state.map(cartProduct => {
        const total = calculateSellerProductsSoldTotalAmount(cartProduct);
        const { sellerName, sellerId, sellerEmail, products } = cartProduct;
        const { fullName, id, userEmail }  = buyer;

        return ({
            sellerName,
            sellerId,
            sellerEmail,
            buyerName: fullName,
            buyerId: id,
            buyerEmail: userEmail,
            products,
            totalAmount: total
        })
    });
    
    return sellersProductSoldTotalAmount;
}

function calculateTotalNumberOfProductsInCart(state = []) {
    let totalProducts = 0;
    const allCartProducts = state.flatMap(({ products }) => products);
    
    totalProducts += allCartProducts.length;   
    return totalProducts;
}

async function createOrderData(productsUserBought, sellerPaymentData, user, orderId, orderTime) {
    const newCartState = productsUserBought.filter(({ products }) => products.length > 0);
    let i = 0;
    let newCartStateLen = newCartState.length;
    let sellerPaymentDataLen = sellerPaymentData.length;

    for (i; i < newCartStateLen; i++) {
        newCartState[i].orderTime = orderTime;
        newCartState[i].orderId = orderId;
    }

    for (i = 0; i < sellerPaymentDataLen; i++) {
        sellerPaymentData[i].orderTime = orderTime;
        sellerPaymentData[i].orderId = orderId
    }

    return ({
        user: user,
        order: newCartState,
        payments: sellerPaymentData
    })
}
    
export {
    createSellerPaymentData, 
    calculateCartTotalPrice, 
    clearCart, 
    reduceCartProductQuantity, 
    addCartProductQuantity,
    addProductToCart,
    removeProductFromCart,
    calculateTotalNumberOfProductsInCart,
    createOrderData,  
}
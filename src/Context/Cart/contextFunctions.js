

let state = [
    {
        sellerName:"jeffrey", 
        productsUserBoughtFromSeller: [
            {productId: 1, productPrice:300, productQty: 5}, 
            {productId: 2, productPrice:300, productQty: 2}, 
            {productId: 3, productPrice:300, productQty: 2}
        ]
    }
];

async function addProductToCart(state =[], action) {
    let productId = action.productId;
    let productQty = action.productQty;
    let sellerName = action.sellerName;
    let sellerExist = false;
    let sellerProductAlreadyExist = false;
    let sellerProducts;

    for (let i = 0; i < state.length; i++) {
        if ( state[i].sellerName === sellerName) {
            sellerExist = true;
            sellerProducts = state[i].productsUserBoughtFromSeller;
            break;
        }  
    }
    if (sellerExist && sellerProducts.length) {
        for (let i = 0; i < sellerProducts.length; i++) {
            if (sellerProducts[i].productId === productId) {
                sellerProductAlreadyExist = true;
                sellerProducts[i].productQty += productQty;
                return state;
            }
        }
        if (!sellerProductAlreadyExist) {
            sellerProducts[sellerProducts.length] = { 
                productId: action.productId,
                productName: action.productName,
                productImages: action.productImages,
                productPrice: action.productPrice,
                productQty: action.productQty,
                productSize: action.productSize,
            };
            return state;
        }
    }
    // add new cart product if seller does not eist
    return [...state, { 
        sellerName: action.sellerName,
        sellerId: action.sellerId,
        sellerEmail: action.sellerEmail,
        productsDelivered: false,
        productsUserBoughtFromSeller:[{
            productId: action.productId,
            productName: action.productName,
            productImages: action.productImages,
            productPrice: action.productPrice,
            productQty: action.productQty,
            productSize: action.productSize,  
        }],
    }];
}

async function removeProductFromCart(state=[], action) {
    let productId = action.productId;
    let sellerName = action.sellerName;
    let sellerProducts;
    let sellerExist = false;

    for (let i = 0; i < state.length; i++) {
        if (state[i].sellerName === sellerName) {
            sellerExist = true;
            sellerProducts = state[i].productsUserBoughtFromSeller;
            break;
        }   
    }
    //  return initial state if seller does not exist
    if (!sellerExist || !sellerProducts.length) {
        return state;
    }
    //   filter product with product id
    let newSellerProducts = sellerProducts.filter(product => {
        return product.productId !== productId;
    });
    //  loop through the cart state and attach the new filtered seller product
    for (let i = 0; i < state.length; i++) {
        if (state[i].sellerName === sellerName) {
            state[i].productsUserBoughtFromSeller = newSellerProducts;
            break;
        }   
    }
    return state;
}
    
async function addCartProductQuantity(state=[], action) {
    let productId = action.productId;
    let sellerName = action.sellerName;
    let productQuantity = action.productQty;
    let sellerProducts;
    let sellerExist = false;

    if (productQuantity < 1) {
        return state;
    }

    for (let i = 0; i < state.length; i++) {
        if (state[i].sellerName === sellerName) {
            sellerExist = true;
            sellerProducts = state[i].productsUserBoughtFromSeller;
            break;
        }  
    }
    //  return initial state if seller does not exist
    if (!sellerExist || !sellerProducts.length) {
        return state;
    }
    //   loop through seller products and add quantity
    for (let i = 0; i < sellerProducts.length; i++) {
        if (sellerProducts[i].productId === productId) {
            sellerProducts[i].productQty += productQuantity;
            break;
        }
    }
    return state;
}
    
async function reduceCartProductQuantity(state=[], action) {
    let productId = action.productId;
    let sellerName = action.sellerName;
    let productQuantity = action.productQty;
    let sellerProducts;
    let sellerExist = false;

    if (productQuantity < 1) {
        return state;
    }
    for (let i = 0; i < state.length; i++) {
        if (state[i].sellerName === sellerName) {
            sellerExist = true;
            sellerProducts = state[i].productsUserBoughtFromSeller;
            break;
        }  
    }
    //  return initial state if seller does not exist
    if (!sellerExist || !sellerProducts.length) {
        return state;
    }
    //   loop through sseller products and add quantity
    for (let i = 0; i < sellerProducts.length; i++) {
        if ( (sellerProducts[i].productId === productId) && !(productQuantity > sellerProducts[i].productQty) ) {
            sellerProducts[i].productQty -= productQuantity;
            break;
        }
    }
    return state;
}
    
async function clearCart(state=[], action) {
    return state = [];
}
    
function calculateCartTotalPrice(state=[]) {
    let allCartProducts = state.flatMap(product => product.productsUserBoughtFromSeller);
    let totalCartSum = 0;

    for (let i = 0; i < allCartProducts.length; i++) {
        totalCartSum += allCartProducts[i].productPrice * allCartProducts[i].productQty;
    }
    return totalCartSum;
}
    
    

function createSellerPaymentData(state=[], buyer) {

    function calculateIndividualSellerPriceSum(product) {
        let total = 0;

        for (let i = 0; i < product.productsUserBoughtFromSeller.length; i++) {
            total += product.productsUserBoughtFromSeller[i].productPrice * product.productsUserBoughtFromSeller[i].productQty
        }
        return ({
            sellerName: product.sellerName,
            sellerId: product.sellerId,
            sellerEmail: product.sellerEmail,
            buyerName: buyer.fullName,
            buyerId: buyer.id,
            buyerEmail: buyer.userEmail,
            productsSellerSold: product.productsUserBoughtFromSeller,
            totalAmount: total
        });
    } 
    const individualTotal = state.map(product => {
        return calculateIndividualSellerPriceSum(product);  
    });
    return individualTotal;
}

function calculateTotalNumberOfProductsInCart(state =[]) {
    let totalProducts = 0;
    let allCartProducts = state.flatMap(product => product.productsUserBoughtFromSeller);
    totalProducts += allCartProducts.length;
    return totalProducts;
}
async function createOrderData(productsUserBought, sellerPaymentData, orderId, orderTime) {
    for(let i = 0; i < productsUserBought.length; i++) {
        productsUserBought[i].orderTime = orderTime;
        productsUserBought[i].orderId =orderId;
    }

    for(let i = 0; i < sellerPaymentData.length; i++) {
        sellerPaymentData[i].orderTime = orderTime;
        sellerPaymentData[i].orderId = orderId
    }
    return ({
        order: productsUserBought,
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
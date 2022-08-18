
const data = {
    reviewsSortData: [
        {name: "Recomended"},
        {name: "New"},
        {name: "Old"}
    ],

    checkout: { 
        options :[
        {name: "Default payment method"},
        {name: "Pay on delivery method"},
    ],
    paymentMethods: {
        default : "Default payment method",
        payOnDelivery: "Pay on delivery method"
    }
}
}

export const reviewsSortData = data.reviewsSortData;
export const chekoutOptions = data.checkout.options;
export const checkoutPaymentMethods = data.checkout.paymentMethods;


import httpBase from './http.config';

const PRODUCT_SERVER_URI = `http://localhost:4003`;
const GATEWAY_SERVER_URI = `http://localhost:4000`;
const LOGIN_SERVER_URI = `http://localhost:4001`;
const productServerHTTP = httpBase(PRODUCT_SERVER_URI);
const loginServerHTTP = httpBase(LOGIN_SERVER_URI);
const gatewayServerHTTP = httpBase(GATEWAY_SERVER_URI);
// const gatewayServerMultipartHTTP = httpBase(GATEWAY_SERVER_URI, "multipart/form-data");

export function getInterests(user) {

    return loginServerHTTP.get(`/interests`, user);

}

export function getConfirmations(user) {

    return loginServerHTTP.get(`/interests`, user);

}

export async function getUserNotifications(user) {

    const userNotifications = await gatewayServerHTTP.get(`/notifications/${user.id}/${user.userEmail}`);

    return userNotifications.data;

}

// product
export async function getProducts(queryData) {

    if (queryData) {

        const {gender, category, usage} = queryData;

        return gatewayServerHTTP.get(`/products?gender=${gender}&category=${category}&usage=${usage}`);

    }

    return gatewayServerHTTP.get(`/products`);

}

export async function getSellerProducts(queryData) {

    const sellerProducts =  await gatewayServerHTTP.get(`/products/${queryData.userId}/${queryData.userEmail}/${queryData.productCategory}`);

    return sellerProducts.data;

}

export function createProduct(data) {

    const createProductResponse = gatewayServerHTTP.post(`/product`, data, { headers: { "Content-Type": "multipart/form-data" } } );

    return createProductResponse.data;

}

export async function deleteProduct(product) {

    const deleteProductResponse =  await gatewayServerHTTP.post(`/remove-product`, product);

    return deleteProductResponse.data;

}

export async function updateProduct(data) {

    const updateProductResponse =  await gatewayServerHTTP.post(`/update-product`, data);

    return updateProductResponse.data;

}

export async function searchProducts(query) {

    const searchroductsResponse =  await gatewayServerHTTP.post(`/search-products?q=${query}`);

    return searchroductsResponse.data;

}

export function uploadService(data) {

    return productServerHTTP.post(`/upload-service`, data);

}

export function updateUser(userData) {

    return loginServerHTTP.post(`/update-user`, userData);

}
// user
export function getUser(data) {

    const {id, userEmail} = data;

    return gatewayServerHTTP.get(`/user/:${id}/:${userEmail}`);

}

export async function signupUser(data) {

    const singedupResponse =  await gatewayServerHTTP.post(`/signup`, data);

    return singedupResponse.data;

}

export async function loginUser(data) {

    const loginResponse =  await gatewayServerHTTP.post(`/login`, data);

    return loginResponse.data;

}

// orders
export async function createOrder(data) {

    const createOrderResponse =  await gatewayServerHTTP.get(`/create-order`, data);
   
    return createOrderResponse.data;

}

export async function getOrders(user) {

    const ordersResponse =  await gatewayServerHTTP.get(`/orders/${user.id}/${user.userEmail}`);

    return ordersResponse.data;

}
// confirm delivery
export async function confirmDelivery(data) {

    const confirmDeliveryResponse =  await gatewayServerHTTP.post(`/confirm-delivery`, data);

    return confirmDeliveryResponse.data;

}

// payments
export async function getPayments(user) {

    const paymentsResponse =  await gatewayServerHTTP.get(`/payments/${user.id}/${user.userEmail}`);
   
    return paymentsResponse.data;

}

import httpBase from './http.config';


const PRODUCT_SERVER_URI = `http://localhost:4003`;
const GATEWAY_SERVER_URI = `http://localhost:4000`;
const LOGIN_SERVER_URI = `http://localhost:4001`;
const productServerHTTP = httpBase(PRODUCT_SERVER_URI);
const loginServerHTTP = httpBase(LOGIN_SERVER_URI);
const gatewayServerHTTP = httpBase(GATEWAY_SERVER_URI);
const gatewayServerMultipartHTTP = httpBase(GATEWAY_SERVER_URI, "multipart/form-data");

export function getInterests(user) {
    return loginServerHTTP.get(`/interests`, user);
}

export function getConfirmations(user) {
    return loginServerHTTP.get(`/interests`, user);
}

export async function getUserNotifications(user) {
    const res = await gatewayServerHTTP.get(`/notifications/${user.id}/${user.userEmail}`);
    return res.data;
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
    const products = sellerProducts.data;
    return products;
}

export function createProduct(data) {
    const createProductResponse = gatewayServerHTTP.post(`/product`, data, { headers: { "Content-Type": "multipart/form-data" } } );
    const createdProduct = createProductResponse.data;
    return createdProduct;
}

export async function deleteProduct(product) {
    const deleteProductResponse =  await gatewayServerHTTP.post(`/remove-product`, product);
    const deleteProductData = deleteProductResponse.data;
    return deleteProductData;
}

export async function updateProduct(data) {
    const updateProductResponse =  await gatewayServerHTTP.post(`/update-product`, data);
    const updatedProduct = updateProductResponse.data;
    return updatedProduct;
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
    return gatewayServerHTTP.get(`/user/:${id}/:${userEmail}`,);
}

export async function signupUser(data) {
    const singedupResponse =  await gatewayServerHTTP.post(`/signup`, data);
    const signedupUserData = singedupResponse.data;
    return signedupUserData;
}

export async function loginUser(data) {
    const loginResponse =  await gatewayServerHTTP.post(`/login`, data);
    const loggedInUser = loginResponse.data;
    return loggedInUser;
}
// orders
export async function createOrder(data) {
    const createOrderResponse =  await gatewayServerHTTP.get(`/create-order`, data);
    const createdOrder = createOrderResponse.data;
    return createdOrder;
}
export async function getOrders(user) {
    const ordersResponse =  await gatewayServerHTTP.get(`/orders/${user.id}/${user.userEmail}`);
    const orders = ordersResponse.data;
    return orders;
}
// confirm delivery
export async function confirmDelivery(data) {
    const confirmDeliveryResponse =  await gatewayServerHTTP.post(`/confirm-delivery`, data);
    const confirmDelivery = confirmDeliveryResponse.data;
    return confirmDelivery;
}

// payments
export async function getPayments(user) {
    const paymentsResponse =  await gatewayServerHTTP.get(`/payments/${user.id}/${user.userEmail}`);
    const payments = paymentsResponse.data;
    return payments;
}
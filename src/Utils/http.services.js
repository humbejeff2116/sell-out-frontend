import httpBase from './http.config';
import { API_DOMAIN } from '../Config/config';

const GATEWAY_SERVER_URI = `https://${API_DOMAIN}`;
const gatewayServerHTTP = httpBase(GATEWAY_SERVER_URI);
// const gatewayServerMultipartHTTP = httpBase(GATEWAY_SERVER_URI, "multipart/form-data");

export async function getUserNotifications(user) {
    const userNotifications = await gatewayServerHTTP.get(`/notifications/${user.id}/${user.userEmail}`);
    return userNotifications.data;
}

export async function getProducts(queryData) {
    if (queryData) {
        const {gender, category, usage} = queryData;
        const products = await gatewayServerHTTP.get(`/products?gender=${gender}&category=${category}&usage=${usage}`);
        return products.data;
    }
    
    const products = await gatewayServerHTTP.get(`/products`);
    return products.data
}

export async function getSellerProducts(queryData) {
    const sellerProducts =  await gatewayServerHTTP.get(`/products/${queryData.userId}/${queryData.userEmail}/${queryData.productCategory}`);
    return sellerProducts.data;
}

export async function getSimilarProducts(queryData) {
    const bottomProducts =  await gatewayServerHTTP.get(`/similar-products/${queryData.userId}/${queryData.userEmail}/${queryData.productCategory}`);
    return bottomProducts.data;
}

export async function createProduct(data) {
    const createProductResponse = await gatewayServerHTTP.post(`/product`, data, {headers: {"Content-Type": "multipart/form-data"}});
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

export async function searchProducts({ searchQuery }) {
    const searchroductsResponse =  await gatewayServerHTTP.get(`/search-products?q=${searchQuery}`);
    return searchroductsResponse.data;
}

export async function updateUser(userData) {
    const updateUserResponse = await gatewayServerHTTP.post(`/update-user`, userData, { headers: {"Content-Type": "multipart/form-data"}});
    return updateUserResponse.data;
}

export async function getUser(data) {
    const { id, userEmail } = data;
    const userResponse =  await gatewayServerHTTP.get(`/user/:${id}/:${userEmail}`);
    return userResponse.data;
}

export async function signupUser(data) {
    const singedupResponse =  await gatewayServerHTTP.post(`/signup`, data);
    return singedupResponse.data;
}

export async function loginUser(data) {
    const loginResponse =  await gatewayServerHTTP.post(`/login`, data);
    return loginResponse.data;
}

export async function createOrder(data) {
    const createOrderResponse =  await gatewayServerHTTP.get(`/create-order`, data);
    return createOrderResponse.data;
}

export async function getOrders(user) {
    const ordersResponse =  await gatewayServerHTTP.get(`/orders/${user.id}/${user.userEmail}`);
    return ordersResponse.data;
}

export async function confirmDelivery(data) {
    const confirmDeliveryResponse =  await gatewayServerHTTP.post(`/confirm-delivery`, data);
    return confirmDeliveryResponse.data;
}

export async function getPayments(user) {
    const paymentsResponse =  await gatewayServerHTTP.get(`/payments/${user.id}/${user.userEmail}`);
    return paymentsResponse.data;
}

export async function getProductReviews(productId) {
    const productReviewsResponse =  await gatewayServerHTTP.get(`/reviews/${productId}`);
    return productReviewsResponse.data;
}

export async function getUserStars(userId) {
    const starsResponse =  await gatewayServerHTTP.get(`/stars/${userId}`);
    return starsResponse.data;
}

export async function getProductLikes(productId) {
    const productLikesResponse =  await gatewayServerHTTP.get(`/product-likes/${productId}`);
    return productLikesResponse.data;
}

export async function getAllUserPreviousSearch({userId}) {
    const deliveryRegionsResponse =  await gatewayServerHTTP.get(`/user-prev-search/${userId}`);
    return deliveryRegionsResponse.data;
}






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




export async function getProducts(queryData) {
    if (queryData) {
        const {gender, category, usage} = queryData;
        return gatewayServerHTTP.get(`/products?gender=${gender}&category=${category}&usage=${usage}`);
    }
    return gatewayServerHTTP.get(`/products`);
}
export function createProduct(data) {
    return gatewayServerHTTP.post(`/product`, data, { headers: {"Content-Type": "multipart/form-data",}} );
}
export function updateUser(userData) {
    return loginServerHTTP.post(`/update-user`, userData);
}

export function uploadService(data) {
    return productServerHTTP.post(`/upload-service`, data);
}
export function getUser(data) {
    const {id, userEmail} = data;
    return productServerHTTP.get(`/user/:${id}/:${userEmail}`,);
}

export async function signupUser(data) {
    const singedupResponse =  await gatewayServerHTTP.post(`/signup`, data);
    const signedupUserData = singedupResponse.data;
    console.log("signed up user is", signedupUserData)
    return signedupUserData;
}

export async function loginUser(data) {
    const loginResponse =  await gatewayServerHTTP.post(`/login`, data);
    const loggedInUserData = loginResponse.data;
    console.log("user login data is", loggedInUserData)
    return loggedInUserData;
}

export async function deleteProduct(product) {
    const deleteProductResponse =  await gatewayServerHTTP.post(`/remove-product`, product);
    const deleteProductData = deleteProductResponse.data;
    console.log("user login data is", deleteProductData)
    return deleteProductData;
}






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
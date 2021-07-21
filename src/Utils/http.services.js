





import httpBase from './http.config';


const PRODUCT_SERVER_URI = `http://localhost:4003`;
const GATEWAY_SERVER_URI = `http://localhost:4000`;
const LOGIN_SERVER_URI = `http://localhost:4000`;
const productServerHTTP = httpBase(PRODUCT_SERVER_URI);
const loginServerHTTP = httpBase(LOGIN_SERVER_URI);
const gatewayServerHTTP = httpBase(GATEWAY_SERVER_URI);

export function getInterests(user) {
    return loginServerHTTP.get(`/interests`, user);
}

export function getConfirmations(user) {
    return loginServerHTTP.get(`/interests`, user);
}

export function uploadProduct(data) {
    return productServerHTTP.get(`/upload-product`, data);
}
export function updateUser(userData) {
    return loginServerHTTP.post(`/update-user`, userData);
}

export function uploadService(data) {
    return productServerHTTP.get(`/upload-service`, data);
}
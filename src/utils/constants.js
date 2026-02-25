//production
//export const BASE_URL="/api";

//dev
export const BASE_URL = location.hostname === "localhost" ? "https://localhost:7777" :"/api";
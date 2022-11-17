const axios = require("axios");

const baseURL = "http://localhost:3000";

describe("getting, adding, and deleting items from the cart", () => {
    let productID = "";
    beforeAll(async () => {
        // create a product
        const newProduct = {
            name: "lemon",
            price: 0.5,
        };
        // add the product
        const response = await axios.post(`${baseURL}/api/products`, newProduct);
        productID = response.data.id;
    });
    afterAll(async () => {
        // delete the product
        await axios.delete(`${baseURL}/api/products/${productID}`);
    });
    test("add an item", async () => {
        const response = await axios.post(`${baseURL}/api/cart/${productID}`);
        expect(response.status).toBe(200);
        expect(response.data.id).toEqual(productID);
        expect(response.data.quantity).toEqual(1);
    });
    test("add an item again", async () => {
        const response = await axios.post(`${baseURL}/api/cart/${productID}`);
        expect(response.status).toBe(200);
        expect(response.data.id).toEqual(productID);
        expect(response.data.quantity).toEqual(2);
    });
    test("set quantity directly", async () => {
        // increase quantity to 5
        const response = await axios.put(`${baseURL}/api/cart/${productID}/5`);
        expect(response.status).toBe(200);
        expect(response.data.id).toEqual(productID);
        expect(response.data.quantity).toEqual(5);
    });
    test("check item in cart", async () => {
        const response = await axios.get(`${baseURL}/api/cart/`);
        const item = response.data.find((item) => (item.id == productID));
        expect(response.status).toBe(200);
        expect(item.id).toEqual(productID);
        expect(item.quantity).toEqual(5);
    });
    test("delete item from cart", async () => {
        const response = await axios.delete(`${baseURL}/api/cart/${productID}`);
        expect(response.status).toBe(200);
    });
});
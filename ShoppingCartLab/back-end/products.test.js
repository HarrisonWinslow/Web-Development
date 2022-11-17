const axios = require("axios");

const baseURL = "http://localhost:3000";

describe("getting, adding, and deleting products", () => {
  let productID = "";
  test("add a product", async () => {
    // create a product
    const newProduct = {
      name: "lemon",
      price: 0.5,
    };
    // add the product
    const response = await axios.post(`${baseURL}/api/products`, newProduct);
    // we expect the response to be 200 and contain our product
    expect(response.status).toBe(200);
    expect(response.data.name).toEqual("lemon");
    productID = response.data.id;
  });
  test("get product", async () => {
    // get one product
    const response = await axios.get(`${baseURL}/api/products/${productID}`);
    // we expect the response to be 200 and contain our pdouct
    expect(response.status).toBe(200);
    expect(response.data.name).toEqual("lemon");
  });
  test("get products", async () => {
    // get all products
    const response = await axios.get(`${baseURL}/api/products`);
    expect(response.status).toBe(200);
    // look for the product we added
    const foundProduct = response.data.find((product) => {
      return product.id === productID;
    });
    // we expect the product ID to be the one we added
    expect(foundProduct.id).toEqual(productID);
  });
  test("delete a product", async () => {
    const response = await axios.delete(`${baseURL}/api/products/${productID}`);
    expect(response.status).toBe(200);
  });
});
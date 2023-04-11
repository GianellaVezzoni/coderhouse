import supertest from "supertest";
import { strict as assert } from "node:assert";
import { app } from "./server.js";

const appReq = supertest(app);

describe("Test productos con asserts", async function () {
  it("Get all", async function () {
    const productsResponse = await appReq.get("/productos");
    assert.deepStrictEqual(true, Array.isArray(productsResponse.data));
  });

  it("Post", async function () {
    const productData = {
      productName: "Product test",
      productPrice: 15.0,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    const response = await appReq.post(`/productos`).send(productData);
    const { id } = response.body;
    assert.deepStrictEqual(response.body, { id: id, ...productData });
    await appReq.delete(`/productos/${id}`);
  });
  it("Update", async function () {
    const productData = {
      productName: "Product test",
      productPrice: 15454,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    let response = await appReq.post(`/productos`).send(productData);
    let productToUpdateData = response.body;
    productToUpdateData.price = 45500;
    response = await appReq
      .put(`/productos/${productToUpdateData.id}`)
      .send(productToUpdateData);
    assert.deepStrictEqual(response.body, productToUpdateData);
    await appReq.delete(`/productos/${response.body.id}`);
  });
  it("Delete", async function () {
    const productData = {
      productName: "Product test",
      productPrice: 15454,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    let response = await appReq.post(`/productos`, productData);
    const productCreated = response.body;
    response = await appReq.delete(`/productos/${productCreated.id}`);
    assert.deepStrictEqual(response.body.deletedId, productCreated.id);
  });
});

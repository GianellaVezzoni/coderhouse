import axios from "axios";
import { expect } from "chai";
import { describe, it } from "mocha";
import { strict as assert } from "node:assert";

describe("Test productos con asserts", async function () {
  it("Get all", async function () {
    const productsResponse = await axios.get(`http://localhost:8080/productos`);
    // Tests for deep equality between the actual and expected parameters.
    assert.deepStrictEqual(true, Array.isArray(productsResponse.data));
  });

  it("Post", async function () {
    const productData = {
      productName: "Product test",
      productPrice: 15.0,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    const response = await axios.post(
      `http://localhost:8080/productos`,
      productData
    );
    const { id } = response.data;
    assert.deepStrictEqual(response.data, { id: id, ...productData });
    await axios.delete(`http://localhost:8080/productos/${id}`);
  });
  it("Update", async function () {
    // Create a product
    const productData = {
      productName: "Product updated",
      productPrice: 155000,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    let response = await axios.post(
      `http://localhost:8080/productos`,
      productData
    );
    // Modify data of that product created
    let productToUpdateData = response.data;
    productToUpdateData.price = 4000;
    // Update product
    response = await axios.put(
      `http://localhost:8080/productos/${productToUpdateData.id}`,
      productToUpdateData
    );
    assert.deepStrictEqual(response.data, productToUpdateData);
    await axios.delete(`http://localhost:8080/productos/${response.data.id}`);
  });
  it("Delete", async function () {
    const productData = {
      productName: "Product",
      productPrice: 158000,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    const response = await axios.post(
      `http://localhost:8080/productos`,
      productData
    );
    const { id } = response.data;
    response = await axios.delete(`http://localhost:8080/productos/${id}`);
    assert.deepStrictEqual(response.data.deletedId, id);
  });
});

describe("Test productos con chai", async function () {
  it("Get all", async function () {
    const productsResponse = await axios.get(`http://localhost:8080/productos`);
    expect(Array.isArray(productsResponse.data)).to.eql(true);
  });

  it("Post", async function () {
    const productData = {
      productName: "Product test",
      productPrice: 15.0,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    const response = await axios.post(
      `http://localhost:8080/productos`,
      productData
    );
    const { id } = response.data;
    expect(response.data).to.deep.equal({ id: id, ...newProduct });
    await axios.delete(`http://localhost:8080/productos/${id}`);
  });
  it("Update", async function () {
    // Create a product
    const productData = {
      productName: "Product updated",
      productPrice: 155000,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    let response = await axios.post(
      `http://localhost:8080/productos`,
      productData
    );
    // Modify data of that product created
    let productToUpdateData = response.data;
    productToUpdateData.price = 4000;
    // Update product
    response = await axios.put(
      `http://localhost:8080/productos/${productToUpdateData.id}`,
      productToUpdateData
    );
    expect(response.data).to.deep.equal(productToUpdateData);
    await axios.delete(`http://localhost:8080/productos/${response.data.id}`);
  });
  it("Delete", async function () {
    const productData = {
      productName: "Product",
      productPrice: 158000,
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
    const response = await axios.post(
      `http://localhost:8080/productos`,
      productData
    );
    const { id } = response.data;
    response = await axios.delete(`http://localhost:8080/productos/${id}`);
    expect(id).to.deep.equal(response.data.id);
  });
});

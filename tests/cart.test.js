const request = require('supertest');
const { Chart, Product } = require('../models/index')
const app = require('../app');
const { clearChartsDatabase } = require('./helpers/cart-helpers');
const { clearProductsDatabase } = require('./helpers/product-helpers');
let productId = 0

afterAll(clearProductsDatabase)

afterAll(clearChartsDatabase)

describe('TEST GET CHART', function () {
  beforeEach(async () => {
    const product = await Product.create({
      name: "Shampo",
      image_url: "http:shampo.com",
      price: 10000,
      stock: 10
    })
    productId = product.id

    const myCart = await Chart.create({
      quantity: 2,
      ProductId: `${productId}`,
      UserId: 78
    })
  })
  test('Success Get Product From Cart', function (done) {
    request(app)
      .get('/chart/show')
      .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("charts");

        expect(res.body.charts).toBeInstanceOf(Array);

        done();
      })
  })
})

describe('TEST ADD CART', function () {
  beforeEach(async () => {
    const product = await Product.create({
      name: "Shampo",
      image_url: "http:shampo.com",
      price: 10000,
      stock: 10
    })
    productId = product.id
  })
  test('Success Add Product To Cart', function (done) {
    request(app)
      .post('/chart/add')
      .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      .send({ quantity: 1, ProductId: `${productId}` })
      .end(function (err, res) {
        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("quantity");
        expect(res.body).toHaveProperty("ProductId");
        expect(res.body).toHaveProperty("UserId");
        expect(res.body).toHaveProperty("updatedAt");
        expect(res.body).toHaveProperty("createdAt");

        done()
      })
  })
})

describe('TEST DELETE CART', function () {
  beforeEach(async () => {
    const product = await Product.create({
      name: "Shampo",
      image_url: "http:shampo.com",
      price: 10000,
      stock: 10
    })
    productId = product.id

    const myCart = await Chart.create({
      quantity: 2,
      ProductId: `${productId}`,
      UserId: 78
    })
  })
  test('Success Delete Product From Cart', function (done) {
    request(app)
      .delete('/chart/delete')
      .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      .send({ ProductId: `${productId}` })
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Succes delete");

        done()
      })
  })
})
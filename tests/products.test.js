const request = require('supertest');
const { Product } = require('../models/index')
const app = require('../app');
const { clearProductsDatabase } = require('./helpers/product-helpers');
let productId = 0

afterAll(clearProductsDatabase)

describe('TEST PRODUCT', function () {
  test('Dapat menampilkan Array of Object Seluruh Product', function (done) {
    request(app)
      .get('/products')
      .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      .end(function (err, res) {
        if (err) throw err;

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);

        done();
      })
  });
  test('Dapat menampilkan Object Product Baru', function (done) {
    request(app)
      .post('/products')
      .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      .send({ name: "Shampo", image_url: "http:shampo.com", price: 10000, stock: 10 })
      .end(function (err, res) {
        if (err) throw err;

        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("id");

        expect(res.body).toHaveProperty("name", "Shampo");
        expect(res.body).toHaveProperty("image_url", "http:shampo.com");
        expect(res.body).toHaveProperty("price", 10000);
        expect(res.body).toHaveProperty("stock", 10);

        done()
      })
  });
  test('Dapat menampilkan pesan validation error is Empty', function (done) {
    request(app)
      .post('/products')
      .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      .send({ name: "", image_url: "", price: "", stock: "" })
      .end(function (err, res) {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");

        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toContainEqual({ message: 'Product name is required' })
        expect(res.body.errors).toContainEqual({ message: 'Product Image Url is required' })
        expect(res.body.errors).toContainEqual({ message: 'Product price is required' })
        expect(res.body.errors).toContainEqual({ message: 'Product stock is required' })

        done()
      })

  })
  test('Dapat menampilkan pesan validation error is Stock and price negative', function (done) {
    request(app)
      .post('/products')
      .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      .send({ name: "Shampo", image_url: "http://imageshampo.com", price: -7, stock: -2 })
      .end(function (err, res) {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");

        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toContainEqual({ message: 'Validation min on price failed' })
        expect(res.body.errors).toContainEqual({ message: 'Validation min on stock failed' })

        done()
      })

  });
  describe('Product with param', function () {
    beforeEach(async () => {
      const product = await Product.create({
        name: "Shampo",
        image_url: "http:shampo.com",
        price: 10000,
        stock: 10
      })
      productId = product.id
    })
    test('Dapat menampilkan Product sesuai id dari param', function (done) {
      request(app)
        .get(`/products/${productId}`)
        .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
    })
    test('Dapat mengupdate data product tertentu', async function () {
      const updatedProduct = await request(app)
        .patch(`/products/${productId}`)
        .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
        .send({
          name: "Shampo Sunshilk",
          image_url: "http:shampo.comm",
          price: 100000,
          stock: 100
        });
      expect(updatedProduct.statusCode).toBe(200);
      expect(updatedProduct.body).toEqual({ message: "Update Success" })
    });
    test('Dapat menampilkan eror ketika databaru is Empty ', async function () {
      const updatedProduct = await request(app)
        .patch(`/products/${productId}`)
        .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
        .send({
          name: "",
          image_url: "",
          price: "",
          stock: ""
        });
      expect(updatedProduct.statusCode).toBe(400);
      expect(updatedProduct.body).toHaveProperty("errors");

      expect(updatedProduct.body.errors).toBeInstanceOf(Array)
      expect(updatedProduct.body.errors).toContainEqual({ message: 'Product name is required' })
      expect(updatedProduct.body.errors).toContainEqual({ message: 'Product Image Url is required' })
      expect(updatedProduct.body.errors).toContainEqual({ message: 'Product price is required' })
      expect(updatedProduct.body.errors).toContainEqual({ message: 'Product stock is required' })
    });
    test('Dapat menampilkan eror ketika databaru price dan stock adalah negative ', async function () {
      const updatedProduct = await request(app)
        .patch(`/products/${productId}`)
        .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
        .send({
          name: "Sabun",
          image_url: "http:shampo.comm",
          price: -3,
          stock: -4
        });
      expect(updatedProduct.statusCode).toBe(400);
      expect(updatedProduct.body).toHaveProperty("errors");

      expect(updatedProduct.body.errors).toBeInstanceOf(Array)
      expect(updatedProduct.body.errors).toContainEqual({ message: 'Validation min on price failed' })
      expect(updatedProduct.body.errors).toContainEqual({ message: 'Validation min on stock failed' })
    });
    test('Dapat menghapus product tertentu', async function () {
      const removedProduct = await request(app)
        .delete(`/products/${productId}`)
        .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })

      expect(removedProduct.body).toEqual({ message: "Deleted" });
      expect(removedProduct.statusCode).toBe(200);
    });
  })
  describe('Delete Product empty', function () {
    test('Dapat menampilkan pesan error ketika menghapus product yang tidak ada', async function () {
      const removedProduct = await request(app)
        .delete(`/products/${productId}`)
        .set({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5NTcwMzA0M30.iGK4VmFugbsOkcS6_iQmTLeEjaYjvDanACdQHH1nGnA' })
      expect(removedProduct.body).toEqual({ message: "Cant update/delete, because Product not found" });
      expect(removedProduct.statusCode).toBe(404);
    });
  })


})

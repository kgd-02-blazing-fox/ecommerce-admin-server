const request = require('supertest')
const app = require('../app')
const { Product, Admin } = require('../models')
const userToken = require('../helpers/jwt')

let adminToken
let product

describe('PRODUCT ROUTES TEST!', () => {

  beforeAll(done => {
    Product.create({
      name: "productName",
      image_url: "image_urls",
      price: 10000,
      stock: 10,
    })
      .then(response => {
        adminToken = userToken({ email: "admin@mail.com" })
        product = response
        done()
      })
      .catch(err => {
        console.log(err);
      })
  })

  afterAll((done) => {
    Product.destroy({
      truncate: true,
      cascade: true
    })
      .then(response => {
        console.log('REFRESHED DB!!');
        done()
      })
      .catch(err => {
        console.log(err);
      })
  })

  //SUCCESS GET PRODUCT TEST!
  describe('SUCCESS GET ALL PRODUCT TEST', () => {
    test('GET /products gives back array of all product in database', function (done) {
      request(app)
        .get('/products')
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(200)
          expect(res.body).toBeInstanceOf(Array)
          expect(res.body.length).toBe(1)
          expect(res.body[0]).toHaveProperty('id')
          expect(res.body[0]).toHaveProperty('name', 'productName')
          expect(res.body[0]).toHaveProperty('image_url', 'image_urls')
          expect(res.body[0]).toHaveProperty('price', 10000)
          expect(res.body[0]).toHaveProperty('stock', 10)
          done();
        });
    });

  })

  //SUCCESS POST PRODUCT TEST!
  describe('SUCCESS POST PRODUCT TEST', () => {

    test('POST /products, authorized action gives back object of input product', function (done) {
      request(app)
        .post('/products')
        .set('access_token', adminToken)
        .send({
          name: "book",
          image_url: "links",
          price: 10000,
          stock: 10
        })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(201)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty("name", "book")
          expect(res.body).toHaveProperty("image_url", "links")
          expect(res.body).toHaveProperty("price", 10000)
          expect(res.body).toHaveProperty("stock", 10)
          done();
        });
    });
  })

  //FAILED POST TEST!
  describe('FAILED POST PRODUCT TEST', () => {

    test('POST /products, authorized, but uncomplete input gives error message', function (done) {
      request(app)
        .post('/products')
        .set('access_token', adminToken)
        .send({
          name: "",
          image_url: "",
          price: 10000,
          stock: 10
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'Validation error: Name is required,\nValidation error: Image is required')
          done();
        });
    });

    test('POST /products, authorized, but minus value of price or stock input gives error message', function (done) {
      request(app)
        .post('/products')
        .set('access_token', adminToken)
        .send({
          name: "book",
          image_url: "links",
          price: -1,
          stock: -1
        })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'Validation error: Price cannot be minus value,\nValidation error: Stock cannot be minus value')
          done();
        });
    });

    test('POST /products, authorized, but wrong data type of name or img_url gives error message', function (done) {
      request(app)
        .post('/products')
        .set('access_token', adminToken)
        .send({
          name: 1,
          image_url: 1,
          price: 1000,
          stock: 10
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'Validation error: Only string input type allowed,\nValidation error: Only string input type allowed')
          done();
        });
    });

    test('POST /products, authorized, but wrong data type for price and stock, gives error message', function (done) {
      request(app)
        .post('/products')
        .set('access_token', adminToken)
        .send({
          name: "book",
          image_url: "links",
          price: "notNumber",
          stock: "notNumber"
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'invalid input syntax for type integer: "notNumber"')
          done();
        });
    });

    test('POST /products, unauthorized, empty access_token, input gives error message', function (done) {
      request(app)
        .post('/products')
        .set('access_token', '')
        .send({
          name: "items",
          image_url: "links",
          price: 10000,
          stock: 10
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt must be provided')
          done();
        });
    });

    test('POST /products, unauthorize, no access_token, gives error message', function (done) {
      request(app)
        .post('/products')
        .send({
          name: "items",
          image_url: "links",
          price: 10000,
          stock: 10
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt must be provided')
          done();
        });
    });

    test('POST /products, unathorize, wrong access_token, input gives error message', function (done) {
      request(app)
        .post('/products')
        .set('access_token', 'wrongtoken')
        .send({
          name: "items",
          image_url: "links",
          price: 10000,
          stock: 10
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt malformed')
          done();
        });
    });

  })

  //SUCCESS DELETE TEST
  describe('SUCCESS DELETE PRODUCT TEST', () => {
    test('DELETE /products gives back message product deleted', function (done) {
      request(app)
        .delete(`/products/${product.id}`)
        .set('access_token', adminToken)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', "Product deleted")
          done();
        });
    });
  })

  //FAILED DELETE TEST
  describe('FAILED DELETE PRODUCT TEST', () => {
    test('DELETE /products, authorized, not found product, gives back error message', function (done) {
      request(app)
        .delete(`/products/${product.id + 99}`)
        .set('access_token', adminToken)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(404)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'Product not Found')
          done();
        });
    });

    test('DELETE /products, unauthorized, gives back error message', function (done) {
      request(app)
        .delete(`/products/${product.id}`)
        .set('access_token', '')
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt must be provided')
          done();
        });
    });
  })

  // SUCCESS GET SPESIFIC PRODUCT
  describe('SUCCESS GET SPESIFIC PRODUCT TEST', () => {
    beforeAll(done => {
      Product.create({
        name: "productName",
        image_url: "image_urls",
        price: 10000,
        stock: 10,
      })
        .then(response => {
          adminToken = userToken({ email: "admin@mail.com" })
          product = response
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })

    test('GET /products/productId, gives back object of spesific product by id', function (done) {
      request(app)
        .get(`/products/${product.id}`)
        .set('access_token', adminToken)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(200)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('id')
          expect(res.body).toHaveProperty('name', 'productName')
          expect(res.body).toHaveProperty('image_url', 'image_urls')
          expect(res.body).toHaveProperty('price', 10000)
          expect(res.body).toHaveProperty('stock', 10)
          done();
        });
    });
  })

  // FAILED GET SPESIFIC PRODUCT
  describe('FAILED GET SPESIFIC PRODUCT TEST', () => {
    test('GET /products/productId, unathorized, wrong token, gives back error message', function (done) {
      request(app)
        .get(`/products/${product.id}`)
        .set('access_token', 'notAdminToken')
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt malformed')
          done();
        });
    });

    test('GET /products/productId, unathorized, no token, gives back error message', function (done) {
      request(app)
        .get(`/products/${product.id}`)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt must be provided')
          done();
        });
    });
  })

  //SUCCESS PUT SPESIFIC PRODUCT
  describe('SUCCESS PUT SPESIFIC PRODUCT TEST', () => {
    test('PUT /products/productId, gives back object of updated product', function (done) {
      request(app)
        .put(`/products/${product.id}`)
        .set('access_token', adminToken)
        .send({
          name: "newProduct",
          image_url: "newLinks",
          price: 20000,
          stock: 20
        })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(201)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty("name", "newProduct")
          expect(res.body).toHaveProperty("image_url", "newLinks")
          expect(res.body).toHaveProperty("price", 20000)
          expect(res.body).toHaveProperty("stock", 20)
          done();
        });
    });
  })

  //FAILED PUT SPESIFIC PRODUCT
  describe('FAILED PUT SPESIFIC PRODUCT TEST', () => {

    test('PUT /products/productId, authorize, but uncomplete input, gives back object', function (done) {
      request(app)
        .put(`/products/${product.id}`)
        .set('access_token', adminToken)
        .send({
          name: "",
          image_url: "",
          price: 20000,
          stock: 20
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'Validation error: Name is required,\nValidation error: Image is required')
          done();
        });
    });

    test('PUT /products/productId, authorize, but minus value in price and stock input, gives back object', function (done) {
      request(app)
        .put(`/products/${product.id}`)
        .set('access_token', adminToken)
        .send({
          name: "book",
          image_url: "links",
          price: -1,
          stock: -1
        })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'Validation error: Price cannot be minus value,\nValidation error: Stock cannot be minus value')
          done();
        });
    });

    test('PUT /products/productId, authorize, but wrong data type in name and image_url, gives back object', function (done) {
      request(app)
        .put(`/products/${product.id}`)
        .set('access_token', adminToken)
        .send({
          name: 1,
          image_url: 1,
          price: 1000,
          stock: 10
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'Validation error: Only string input type allowed,\nValidation error: Only string input type allowed')
          done();
        });
    });

    test('PUT /products/productId, authorize, but wrong data type in price and stock, gives back object', function (done) {
      request(app)
        .put(`/products/${product.id}`)
        .set('access_token', adminToken)
        .send({
          name: "book",
          image_url: "links",
          price: "notNumber",
          stock: "notNumber"
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'invalid input syntax for type integer: "notNumber"')
          done();
        });
    });

    test('PUT /products/productId, unathorize, no token, gives back object', function (done) {
      request(app)
        .put(`/products/${product.id}`)
        .send({
          name: "newProduct",
          image_url: "newLinks",
          price: 20000,
          stock: 20
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt must be provided')
          done();
        });
    });

    test('PUT /products/productId, unathorize, wrong token, gives back object', function (done) {
      request(app)
        .put(`/products/${product.id}`)
        .set('access_token', 'wrongToken')
        .send({
          name: "newProduct",
          image_url: "newLinks",
          price: 20000,
          stock: 20
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty('message', 'jwt malformed')
          done();
        });
    });

  })

})

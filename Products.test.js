const request = require('supertest')
const app = require('./app')

afterAll(done => {
  done()
})

test('GET /products gives back array', function (done) {
  request(app)
    .get('/products')
    .end(function (err, res) {
      if (err) throw err;
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      done();
    });
});

test('POST /products gives back object of input product', function (done) {
  request(app)
    .post('/products')
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

test('POST /products uncomplete input gives error message', function (done) {
  request(app)
    .post('/products')
    .send({
      name: "",
      image_url: "links",
      price: 10000,
      stock: 10
    })
    .end(function (err, res) {
      if (err) throw err;
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty('message')
      done();
    });
});
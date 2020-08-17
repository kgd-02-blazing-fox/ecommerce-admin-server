const request = require('supertest')
const app = require('./app')

afterAll(done => {
  done()
})

test('POST/ login gives back object of access_token', function (done) {
  request(app)
    .post('/users/login')
    .send({ email: "admin@mail.com", password: "1234" })
    .end(function (err, res) {
      console.log(res.body.access_token);
      if (err) throw err;
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty("access_token")
      done();
    });
});

test('POST/ wrong password gives back message in object', function (done) {
  request(app)
    .post('/users/login')
    .send({ email: "admin@mail.com", password: "" })
    .end(function (err, res) {
      if (err) throw err;
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty("message", "email / password invalid!")
      done();
    });
});

//admin token test
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTk3NjY5MTk1fQ._CW3oYsYLlFmBrtNSxaOkLeGzCeKUArtn0jA83bIz3Y
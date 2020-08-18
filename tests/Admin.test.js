const request = require('supertest')
const app = require('../app')
const { Admin } = require('../models')

afterAll(done => {
  Admin.destroy({
    truncate: true,
    cascade: true
  })
    .then(response => {
      console.log('REFRESHED DB!');
      done()
    })
    .catch(err => {
      console.log(err);
    })
})

describe('ADMIN ROUTES TEST!', () => {

  describe('SUCCESS TEST', () => {
    test('POST/ login gives back object of access_token', function (done) {
      request(app)
        .post('/admin')
        .send({ email: "admin@mail.com", password: "1234" })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(200)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty("access_token")
          done();
        });
    });
  })

  describe('FAIL TEST', () => {
    test('POST/, empty email and password gives back error message in object', function (done) {
      request(app)
        .post('/admin')
        .send({ email: "", password: "" })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty("message", "email / password invalid!")
          done();
        });
    });

    test('POST/, wrong password gives back error message in object', function (done) {
      request(app)
        .post('/admin')
        .send({ email: "admin@mail.com", password: "wrongpassword" })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty("message", "email / password invalid!")
          done();
        });
    });

    test('POST/, wrong email gives back error message in object', function (done) {
      request(app)
        .post('/admin')
        .send({ email: "notAdmin@mail.com", password: "1234" })
        .end(function (err, res) {
          if (err) throw err;
          expect(res.status).toBe(400)
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body).toHaveProperty("message", "email / password invalid!")
          done();
        });
    });
  })

})

//admin token test
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTk3NjY5MTk1fQ._CW3oYsYLlFmBrtNSxaOkLeGzCeKUArtn0jA83bIz3Y
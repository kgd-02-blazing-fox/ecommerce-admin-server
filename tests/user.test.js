const request = require('supertest');
const { User } = require('../models/index')
const app = require('../app');
const { clearUsersDatabase } = require('./helpers/user-helpers');

afterAll(clearUsersDatabase)

describe('User Login', function () {
  test('Dapat login dan mendapat token', function (done) {
    request(app)
      .post('/users/login')
      .send({ email: 'admin@gmail.com', password: 'admin' })
      .end(function (err, res) {
        if (err) throw err

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("token");

        done()
      })
  })
  test('Dapat menampilkan error jika email salah', function (done) {
    request(app)
      .post('/users/login')
      .send({ email: 'adminsalah@gmail.com', password: '12345' })
      .end(function (err, res) {
        if (err) throw err
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({ message: 'Invalid email and password' })

        done()
      })
  })
  test('Dapat menampilkan error jika password salah', function (done) {
    request(app)
      .post('/users/login')
      .send({ email: 'admin@gmail.com', password: '12345' })
      .end(function (err, res) {
        if (err) throw err
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({ message: 'Invalid email and password' })

        done()
      })
  })
})

describe('User Register', function () {
  test('Success Register', function (done) {
    request(app)
      .post('/users/register')
      .send({ email: 'adminbaru@gmail.com', password: 'admin' })
      .end(function (err, res) {
        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Succes Register User adminbaru@gmail.com ");

        done()
      })
  })
  test('Dapat menampilkan error jika email sudah terdaftar', function (done) {
    request(app)
      .post('/users/register')
      .send({ email: 'admin@gmail.com', password: '1234' })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "User Sudah terdaftar");

        done()
      })
  })
  test('Dapat menampilkan error jika format email salah', function (done) {
    request(app)
      .post('/users/register')
      .send({ email: 'admingmail.com', password: '123457' })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");

        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toContainEqual({ message: 'Format field nya harus email' })

        done()
      })
  })  
  test('Dapat menampilkan error jika length pasword tidak sesuai', function (done) {
    request(app)
      .post('/users/register')
      .send({ email: 'adminsalah@gmail.com', password: '12' })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");

        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toContainEqual({ message: 'Password length more than 3 and less than 16' })

        done()
      })
  })
  test('Dapat menampilkan error jika email dan pasword kosong', function (done) {
    request(app)
      .post('/users/register')
      .send({ email: '', password: '' })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");

        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toContainEqual({ message: 'Password length more than 3 and less than 16' })
        expect(res.body.errors).toContainEqual({ message: 'User email is required' })
        expect(res.body.errors).toContainEqual({ message: 'Format field nya harus email' })
        expect(res.body.errors).toContainEqual({ message: 'User password is required' })


        done()
      })
  })
  

})
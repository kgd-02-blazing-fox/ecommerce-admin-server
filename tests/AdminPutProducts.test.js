"use strict"

const app = require("../app.js")
const request = require("supertest")
const jwt = require("jsonwebtoken")
const {User,Product} = require("../models/index.js")
let access_token
let id

describe("Admin - putProducts",()=>{

    beforeAll(done=>{
        Product.bulkCreate([{
                name: 'Milk',
                image_url: 'milk.png',
                price: 50000,
                stock: 20,
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                name: 'Oil',
                image_url: 'oil.png',
                price: 20000,
                stock: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                name: 'Crepes',
                image_url: 'crepes.png',
                price: 35000,
                stock: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            }])
        .then(res=>{
            return User.create({
            name: 'John Doe',
            email: 'johndoe@ecommerce.com',
            password: '123456',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            })
        })
        .then(res=>{
            return Product.findAll({})
            .then(res=>{
                id = res[res.length-1].id
            })
        })
        .then(res=>{
            access_token = jwt.sign({
                name:'John Doe',
                email: 'johndoe@ecommerce.com',
                role:'admin'
            },"123456")
            done()
        })
        .catch(err=>console.log(err))
    })

    afterAll(done=>{
        Product.destroy({
            truncate:true,
            cascade:true
            })
        .then(res=>{return User.destroy({
            where:{role:"admin"}
        })})
        .then(res=>{done()})
        .catch(err=>console.log(err))
    })

    test("admin putProducts success",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":access_token})
        .send({
            name: 'UltraSoy',
            image_url: 'ultrasoy.png',
            price: 5000,
            stock: 120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("name","UltraSoy")
            expect(res.body).toHaveProperty("image_url","ultrasoy.png")
            expect(res.body).toHaveProperty("price",5000)
            expect(res.body).toHaveProperty("stock",120)
            done()
        })
    })

    test("admin postProducts failed - empty name",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":access_token})
        .send({
            name: '',
            image_url: 'ultrasoy.png',
            price: 5000,
            stock: 120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the product name")
            done()
        })
    })

    test("admin postProducts failed - duplicate name",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":access_token})
        .send({
            name: 'Milk',
            image_url: 'milk.png',
            price: 50000,
            stock: 20,
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Product item already registered")
            done()
        })
    })

    test("admin postProducts failed - empty image",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":access_token})
        .send({
            name: 'UltraSoy',
            image_url: '',
            price: 5000,
            stock: 120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the product image")
            done()
        })
    })

    test("admin postProducts failed - empty price",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":access_token})
        .send({
            name: 'UltraSoy',
            image_url: 'ultrasoy.png',
            price: 0,
            stock: 120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the product price")
            done()
        })
    })

    test("admin postProducts failed - Negative price",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":access_token})
        .send({
            name: 'UltraSoy',
            image_url: 'ultrasoy.png',
            price: -5000,
            stock: 120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the right price format")
            done()
        })
    })

    test("admin postProducts failed - Negative stock",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":access_token})
        .send({
            name: 'UltraSoy',
            image_url: 'ultrasoy.png',
            price: 5000,
            stock: -120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the right stock format")
            done()
        })
    })



    test("admin putProducts failed - token does not belong to authenticated",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":
            jwt.sign({
                name:'John',
                email: 'johndairy@ecommerce.com',
                role:'customer'
           },"123456")
        })
        .send({
            name: 'UltraSoy',
            image_url: 'ultrasoy.png',
            price: 5000,
            stock: 120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Access denied")
            done()
        })
    })

    test("admin putProducts failed - invalid token",done=>{
        request(app)
        .put(`/products/${id}`)
        .set({"access_token":"access_token"})
        .send({
            name: 'UltraSoy',
            image_url: 'ultrasoy.png',
            price: 5000,
            stock: 120,
        })
        .end((err,res)=>{
            expect(res.status).toBe(500)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Internal error")
            done()
        })
    })
})
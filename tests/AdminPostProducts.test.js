"use strict"

const app = require("../app.js")
const request = require("supertest")
const jwt = require("jsonwebtoken")
const {User,Product} = require("../models/index.js")
let access_token

describe("Admin - postProducts",()=>{

    beforeAll(done=>{
        Product.bulkCreate([{
                name: 'Milk',
                image_url: 'milk.png',
                price: 50000,
                stock: 20,
                category: "food",
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                name: 'Oil',
                image_url: 'oil.png',
                price: 20000,
                stock: 50,
                category: "food",
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                name: 'Crepes',
                image_url: 'crepes.png',
                price: 35000,
                stock: 10,
                category: "food",
                createdAt: new Date(),
                updatedAt: new Date(),
            }])
        .then(res=>{
            return User.create({
            name: 'admin',
            email: 'admin@mail.com',
            password: '1234',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            })
        })
        .then(res=>{
            access_token = jwt.sign({
                name:'admin',
                email: 'admin@mail.com',
                role:'admin'
            },process.env.JWT_SECRET || "123456")
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

    test("admin postProducts success",done=>{
        request(app)
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: 'UltraMilk',
            image_url: 'ultramilk.png',
            price: 2000,
            stock: 10,
            category: "food",
        })
        .end((err,res)=>{
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("name","UltraMilk")
            expect(res.body).toHaveProperty("image_url","ultramilk.png")
            expect(res.body).toHaveProperty("price",2000)
            expect(res.body).toHaveProperty("stock",10)
            expect(res.body).toHaveProperty("category", "food")
            done()
        })
    })

    test("admin postProducts failed - empty name",done=>{
        request(app)
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: '',
            image_url: 'ultramilk.png',
            price: 2000,
            stock: 10,
            category: "food"
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
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: 'Milk',
            image_url: 'milk.png',
            price: 50000,
            stock: 20,
            category: "food"
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
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: 'UltraMilk',
            image_url: '',
            price: 2000,
            stock: 10,
            category: "food",
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
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: 'UltraMilk',
            image_url: 'milk.png',
            price: 0,
            stock: 10,
            category: "food",
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
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: 'UltraMilk',
            image_url: 'milk.png',
            price: -2000,
            stock: 10,
            category: "food"
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
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: 'UltraMilk',
            image_url: 'milk.png',
            price: 2000,
            stock: -10,
            category: "food",
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the right stock format")
            done()
        })
    })

    test("admin postProducts failed - Empty category",done=>{
        request(app)
        .post("/products")
        .set({"access_token":access_token})
        .send({
            name: 'UltraMilk',
            image_url: 'milk.png',
            price: 2000,
            stock: 10,
            category: "",
        })
        .end((err,res)=>{
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the category")
            done()
        })
    })

    test("admin postProducts failed - token does not belong to authenticated",done=>{
        request(app)
        .post("/products")
        .set({"access_token":
            jwt.sign({
                name:'John',
                email: 'johndairy@ecommerce.com',
                role:'customer'
           },process.env.JWT_SECRET || "123456")
        })
        .send({
            name: 'UltraMilk',
            image_url: 'ultramilk.png',
            price: 2000,
            stock: 10,
            category: "food"
        })
        .end((err,res)=>{
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Access denied")
            done()
        })
    })

    test("admin postProducts failed - invalid token",done=>{
        request(app)
        .post("/products")
        .set({"access_token":"access_token"})
        .send({
            name: 'UltraMilk',
            image_url: 'ultramilk.png',
            price: 2000,
            stock: 10,
            category: "food"
        })
        .end((err,res)=>{
            expect(res.status).toBe(500)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Internal error")
            done()
        })
    })
})
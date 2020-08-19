"use strict"

const app = require("../app.js")
const request = require("supertest")
const jwt = require("jsonwebtoken")
const {User,Product} = require("../models/index.js")
let access_token

describe("Admin - getProducts",()=>{

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

    test("admin getProducts success",done=>{
        request(app)
        .get("/products")
        .set({"access_token":access_token})
        .end((err,res)=>{
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(3)
            done()
        })
    })

    test("admin getProducts failed - token does not belong to authenticated",done=>{
        request(app)
        .get("/products")
        .set({"access_token":
            jwt.sign({
                name:'John',
                email: 'johndairy@ecommerce.com',
                role:'customer'
           },"123456")
        })
        .end((err,res)=>{
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Access denied")
            done()
        })
    })

    test("admin getProducts failed - invalid token",done=>{
        request(app)
        .get("/products")
        .set({"access_token":"access_token"})
        .end((err,res)=>{
            expect(res.status).toBe(500)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Internal error")
            done()
        })
    })
})
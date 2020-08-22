"use strict"

const app = require("../app.js")
const request = require("supertest")
const jwt = require("jsonwebtoken")
const {User,Product} = require("../models/index.js")
let access_token
let id

describe("Admin - delProducts",()=>{

    beforeAll(done=>{
        Product.bulkCreate([{
                name: 'Milk',
                image_url: 'milk.png',
                price: 50000,
                stock: 20,
                category:"food",
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                name: 'Oil',
                image_url: 'oil.png',
                price: 20000,
                stock: 50,
                category:"food",
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                name: 'Crepes',
                image_url: 'crepes.png',
                price: 35000,
                stock: 10,
                category:"food",
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
            return Product.findAll({})
            .then(res=>{
                id = res[res.length-1].id
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

    test("admin delProducts success",done=>{
        request(app)
        .delete(`/products/${id}`)
        .set({"access_token":access_token})
        .end((err,res)=>{
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("name","Crepes")
            expect(res.body).toHaveProperty("image_url","crepes.png")
            expect(res.body).toHaveProperty("price",35000)
            expect(res.body).toHaveProperty("stock",10)
            expect(res.body).toHaveProperty("category","food")
            done()
        })
    })

    test("admin delProducts failed - token does not belong to authenticated",done=>{
        request(app)
        .delete(`/products/${id}`)
        .set({"access_token":
            jwt.sign({
                name:'John',
                email: 'johndairy@ecommerce.com',
                role:'customer'
           },process.env.JWT_SECRET || "123456")
        })
        .end((err,res)=>{
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Access denied")
            done()
        })
    })

    test("admin delProducts failed - invalid token",done=>{
        request(app)
        .delete(`/products/${id}`)
        .set({"access_token":"access_token"})
        .end((err,res)=>{
            expect(res.status).toBe(500)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Internal error")
            done()
        })
    })
})
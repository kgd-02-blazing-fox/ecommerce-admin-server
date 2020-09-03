let { Product, User } = require('../models/index')
const nodemailer = require('nodemailer')


class ProductController {

    static findAllProduct(req, res, next) {
        Product.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static createProduct(req, res, next) {
        let { name, description, image_url, price, stock, category } = req.body
        Product.create({
            name,
            description,
            image_url,
            price,
            stock,
            category
        })
            .then(data => {
                res.status(201).json({
                    data,
                    notif: 'Product successfully created!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findProductById(req, res, next) {
        let { id } = req.params
        Product.findByPk(id)
            .then(data => {
                if(data) {
                    res.status(200).json({
                        data
                    })
                } else {
                    throw {
                        msg: "Product not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        let {id} = req.params
        let { name, description, image_url, price, stock, category} = req.body
        Product.update({
            name,
            description,
            image_url,
            price,
            stock,
            category
        }, {
            where: {
                id
            }
        })
            .then(result => {
                if(result[0] == 1 ) {
                    res.status(200).json({
                        notif: 'Product successfully updated!'
                    })
                } else {
                    throw {
                        msg: "Product not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProductStock (req, res, next) {
        let {id} = req.params
        let { stock } = req.body
        let { email } = req.body
        console.log(email,'di sini coy',111111111)
        Product.update({
            stock
        }, {
            where: {
                id
            }
        })
            .then(result => {
                if(result[0] == 1 ) {
                    ProductController.sendEmail(email, 'digi-one store')
                    res.status(200).json({
                        notif: 'Product successfully updated!'
                    })
                } else {
                    throw {
                        msg: "Product not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let {id} = req.params
        Product.destroy({
            where: {
                id
            }
        })
            .then(result => {
                if(result == 1 ) {
                    res.status(200).json({
                        notif: 'Product successfully removed!'
                    })
                } else {
                    throw {
                        msg: "Product not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }


    static sendEmail(email, pass) {
        //step 1
        //call transporter and authenticator
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SEND,
                pass: process.env.PASSWORD_SEND
                // user: 'pancakebantet@gmail.com',
                // pass: 'coba@7890'
                //silahkan diisi, ini bisa diisi langung, bisa juga diisi dengan dotenv:
                //kalo gamau langsung coba liat dokumentasi dotenv
                //call with process.env.
                //.env di ignore
                //di dalem .env isi :
                //PASSWORD:
                //EMAIL:
                //referensi: https://www.youtube.com/watch?v=Va9UKGs1bwI&t

                // pancakebantet@gmail.com
                // coba@7890
            }
        })
        //step 2 define delivery path
        let mailOptions = {
            from: '',
            //jangan lupa diisi from-nya
            to: `${email}`,
            subject: 'Thank you!',
            html:   `<b> <h3> Thank you for shopping at ${pass} </h3>
                        <p>Please complete your transaction immediately by transferring according to the amount stated on the invoice which can be seen on the invoice section of ${pass} website</p>
                        <br>
                        <br>
                        <hr>
                        <p>Thanks you for shopping and Happy Shopping</p>
                        <br>
                        <p>
                            Best regards,<br>
                            ${pass}<br>
                            &#64;Kuningan City Indonesia<br>
                            asdfg@gmail.com
                        </p>
                    </b>`
        }
        //IMPORTANT!
        //Before sending, check you email provider regarding the authority for nodemailer use
        //for an example, you must turn on this feature if you use gmail: https://myaccount.google.com/lesssecureapps

        //Step 3 (Time to send it!)

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log('hooray! email is sent!')
            }
        })
    }

}

module.exports = ProductController
# E-Commerce-admin-server

Providing a E-commerce services which can be added, manipulated, and deleted later by admin, and customers

--
## POST login admin:

* URL:

        /login

* Method:

        POST

* URL Params:

        None

* Data Params:

        Required:

        email=[string]
        password=[string]

* Success Response:

        Code: 200 OK
        Content: {
        "access_token": "eyJhbAKDFasJDFAI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSfyjkfstssgsgfWRyaWNrIiwiZW1haWwiOiJsYXVyZW50aXVzZWRyaWNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMDUkVWFoS0RqZlZTSTViSktHUE1YOHovZUdXY1oxNmZPeWlpasdasdnEiLCJvcmdhbml6YXRpb24iOiJIYWNrdGl2OCIsInVwZGF0ZWRBdxcvbnxvbnyDg6NTY6NTEuOTQzWiIsImNyZWF0ZWRBdCI6IjIwMjAtMDgtMTRUMDg6NTY6NTEuOTQzWiIsImlhdCI6MTU5NzM5NTQxMn0.Yzf7ASzXCr4i56hZXxtFA1aE95guf5dXXtYuDcBJAZM"
        }

* Error Response:

        Code: 400 BAD REQUEST
        Content: { message : "Validation error" }
        
        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }

## GET products by Admin:


* URL:

        /products

* Method:

        GET

* URL Params:

        None

* Data Params:

        Required Headers:
        access_token=[string]

* Success Response:

        Code: 200 OK
        Content: [
        {
            "id": 1,
            "name": 'Milk',
            "image_url": 'milk.png',
            "price": 50000,
            "stock": 20,
            "category": 'food'
            "createdAt": "2020-08-13T20:16:26.631Z",
            "updatedAt": "2020-08-14T07:11:13.028Z"
        },
        {
            "id": 2,
            "name": 'Oil',
            "image_url": 'oil.png',
            "price": 20000,
            "stock": 50,
            "category": 'food'
            "createdAt": "2020-08-13T20:16:55.090Z",
            "updatedAt": "2020-08-14T08:44:56.066Z"
        },
        {
            "id": 3,
            "name": 'Crepes',
            "image_url": 'crepes.png',
            "price": 35000,
            "stock": 10,
            "category": 'food'
            "createdAt": "2020-08-14T03:53:10.592Z",
            "updatedAt": "2020-08-14T08:44:57.547Z"
        }
        ]

* Error Response:

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid token" }
        
        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## POST products by Admin:

* URL:

        /products

* Method:

        POST

* URL Params:

        None

* Data Params:

        Required:
        name=[string]
        image_url=[string]
        price=[integer]
        stock=[integer]
        category=[string]

        Required Headers:
        access_token=[string]

* Success Response:

        Code: 201 CREATED
        Content: {
        "id": 4,
        "name": 'Bananas',
        "image_url": 'bananas.png',
        "price": 50000,
        "stock": 20,
        "category": 'food'
        "createdAt": "2020-08-19T03:53:10.592Z",
        "updatedAt": "2020-08-19T08:44:57.547Z"
        }

* Error Response:

        Code: 400 BAD REQUEST
        Content: { message : "Validation error" }

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid token" }
        
        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }


## PUT products by Admin:

* URL:

        /products/:id

* Method:

        PUT

* URL Params:

        Required:
        
        id=[integer]

* Data Params:

        Required:
        name=[string]
        image_url=[string]
        price=[integer]
        stock=[integer]
        category=[string]

        Required Headers:
        access_token=[string]

* Success Response:

        Code: 200 OK
        Content: {
        "id": 4,
        "name": 'Mananas',
        "image_url": 'mananas.png',
        "price": 500,
        "stock": 2000,
        "category": 'food'
        "createdAt": "2020-08-19T03:53:10.592Z",
        "updatedAt": "2020-08-19T10:44:57.547Z"
        }

* Error Response:

        Code: 400 BAD REQUEST
        Content: { message : "Validation error" }

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid token" }
        
        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }
 
 
## DELETE products by Admin:

* URL:

        /products/:id

* Method:

        DELETE

* URL Params:

        Required:

        id=[integer]

* Data Params:

        Required Headers:
        access_token=[string]

* Success Response:

        Code: 200 OK
        Content: {
        "id": 4,
        "name": 'Mananas',
        "image_url": 'mananas.png',
        "price": 500,
        "stock": 2000,
        "category": 'food'
        "createdAt": "2020-08-19T03:53:10.592Z",
        "updatedAt": "2020-08-19T10:44:57.547Z"
        }

* Error Response:

        Code: 401 UNAUTHORIZED
        Content: { message : "Invalid token" }
        
        Code: 500 INTERNAL ERROR
        Content: { message : "Internal error" }

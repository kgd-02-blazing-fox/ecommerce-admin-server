# E COMMERCE CMS

### API

List of available endpoints:
​
```
- POST /admin
- POST /user
```
```
- GET /products
- POST /products
- DELETE /products/:productId
- GET /products/:productId
- PUT /products/:productId
```
```
- GET /products/user/:productId
- POST /products/stock
```
```
- POST /user/login
- POST /user/register
```
```
- GET /user/cart
- POST /user/cart
- PUT /user/cart/:productId/increment
- PUT /user/cart/:productId/decrement
```
<br>
<hr>
<br>

### to run test
    `npm run test`

---

### POST /admin

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": "email / password invalid!"
}
```
​
### POST /user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": "email / password invalid!"
}
```

### GET /products

description: 
  get all products data

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
[
  {
    "id": 1,
    "name": "PRODUCT NAME",
    "image_url": "imageurls",
    "price": 20,
    "stock": 10,
  },
  {
    "id": 2,
    "name": "PRODUCT NAME",
    "image_url": "imageurls",
    "price": 20,
    "stock": 10,
  }
]
```

Response:

- status: 400
- cause: authorized, but uncomplete input gives error message
- body:

```json
  {
    "message": "Validation error: Name is required,\nValidation error: Image is required"
  }
```

Response:

- status: 400
- cause: authorized, but minus value of price or stock input gives error message
- body:

```json
  {
    "message": "Validation error: Price cannot be minus value"
  }
```

Response:

- status: 400
- cause: authorized, but wrong data type for price and stock, gives error message
- body:

```json
  {
    "message": "invalid input syntax for type integer: notNumber"
  }
```

Response:

- status: 400
- cause: unauthorized, empty access_token, input gives error message
- body:

```json
  {
    "message": "jwt must be provided"
  }
```

Response:

- status: 400
- cause: unathorize, wrong access_token, input gives error message
- body:

```json
  {
    "message": "jwt malformed"
  }
```



### POST /products

description: 
  post a product data

Request:

- headers: access_token

Response:

- status: 201
- body:

```json
  {
    "id": 1,
    "name": "PRODUCT NAME",
    "image_url": "imageurls",
    "price": 20,
    "stock": 10,
  }
```

Response:

- status: 400
- cause: authorized, but uncomplete input gives error message
- body:

```json
  {
    "message": "Validation error: Name is required,\nValidation error: Image is required"
  }
```

Response:

- status: 400
- cause: authorized, but minus value of price or stock input gives error message
- body:

```json
  {
    "message": "Validation error: Price cannot be minus value,\nValidation error: Stock cannot be minus value"
  }
```

Response:

- status: 400
- cause: authorized, but wrong data type of name or img_url gives error message
- body:

```json
  {
    "message": "Validation error: Only string input type allowed,\nValidation error: Only string input type allowed"
  }
```

Response:

- status: 400
- cause: authorized, but wrong data type for price and stock, gives error message
- body:

```json
  {
    "message": "invalid input syntax for type integer: notNumber"
  }
```

Response:

- status: 400
- cause: unauthorized, empty access_token, input gives error message
- body:

```json
  {
    "message": "jwt must be provided"
  }
```

Response:

- status: 400
- cause: products, unauthorize, no access_token, gives error message
- body:

```json
  {
    "message": "jwt must be provided"
  }
```

Response:

- status: 400
- cause: unathorize, wrong access_token, input gives error message
- body:

```json
  {
    "message": "jwt malformed"
  }
```

### DELETE /products/:productId

description: 
  delete a product data

Request:

- headers: access_token

Params:

- product ID in params

Response:

- status: 200
- body:

```json
  {
    "message": "Product deleted"
  }
```

Response:

- status: 404
- cause: authorized, not found product, gives back error message
- body:

```json
  {
    "message": "Product not Found"
  }
```

Response:

- status: 400
- cause: unauthorized, empty access_token, input gives error message
- body:

```json
  {
    "message": "jwt must be provided"
  }
```

Response:

- status: 400
- cause: products, unauthorize, no access_token, gives error message
- body:

```json
  {
    "message": "jwt must be provided"
  }
```

### GET /products/:productId

description: 
  get spesific product data

Request:

- headers: access_token

Params:

- product ID in params

Response:

- status: 200
- body:

```json
  {
    "id": 1,
    "name": "PRODUCT NAME",
    "image_url": "imageurls",
    "price": 20,
    "stock": 10,
  }
```

Response:

- status: 400
- cause: unathorized, wrong token, gives back error message
- body:

```json
  {
    "message": "jwt malformed"
  }
```

### PUT /products/:productId

description: 
  update spesific product data

Request:

- headers: access_token

Params:

- product ID in params

Require :

- product data in body

Response:

- status: 201
- body:

```json
  {
    "id": 1,
    "name": "PRODUCT NAME",
    "image_url": "imageurls",
    "price": 20,
    "stock": 10,
  }
```

Response:

- status: 400
- cause: authorize, but uncomplete input, gives back object
- body:

```json
  {
    "message": "Validation error: Name is required,\nValidation error: Image is required"
  }
```

Response:

- status: 400
- cause: authorize, but wrong data type in name and image_url, gives back object
- body:

```json
  {
    "message": "Validation error: Only string input type allowed,\nValidation error: Only string input type allowed"
  }
```

- status: 400
- cause: authorize, but wrong data type in price and stock, gives back object
- body:

```json
  {
    "message": "invalid input syntax for type integer: notNumber"
  }
```


- status: 400
- cause: unathorize, no token, gives back object
- body:

```json
  {
    "message": "jwt must be provided"
  }
```

- status: 400
- cause: unathorize, wrong token, gives back object
- body:

```json
  {
    "message": "jwt malformed"
  }
```

### GET /products/user/:productId
description: 
  get spesific product data for user

Request:

- headers: access_token

Params:

- product ID in params


Response:

- status: 200
- body:

```json
  {
    "id": 1,
    "name": "PRODUCT NAME",
    "image_url": "imageurls",
    "price": 20,
    "stock": 10,
  }
```

Response:

- status: 404
- cause: authorize, but product not found, gives back object
- body:

```json
  {
    "message": "Product not found"
  }
```

### POST /products/stock
description: 
  update product stock database based on data from checkout user

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
  empty
```

Response:

- status: 400
- cause: authorize, but product not found, gives back object
- body:

```json
  {
    message: Database product stock update failed
  }
```

### POST /user/login
description: 
  login registered user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:

```json
  {
    "access_token": generatedtoken,
  }
```

Response:

- status: 400
- cause: wrong password or email
- body:

```json
  {
    message: "email / password invalid!"
  }
```

### POST /user/register
description: 
  new user registration

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:

```json
  {
    "email": "registeredemail",
  }
```

Response:

- status: 400
- cause: wrong password or email
- body:

```json
  {
    "message": "registration failed, check input"
  }
```

### GET /user/cart
description: 
  get spesific user cart, will return array of items in cart

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
[
  {
    "id": 1,
    "name": "PRODUCT NAME",
    "image_url": "imageurls",
    "price": 20,
    "stock": 10,
  }
]
```

Response:

- status: 500
- cause: failed fetch
- body:

```json
  {
    "message": "fetch failed, internal server"
  }
```

### POST /user/cart
description: 
  create a new cart for user

Request:

- headers: access_token

- data:

```json
- req.body.ammount
- req.body.ProductId
- req.userId
```

Response:

- status: 201
- body:

```json
  {
    "id": 1,
    "UserId": 1,
    "ProductId": 1,
    "ammount": 1,
  }
```

Response:

- status: 200
- body:

```json
  {
    "id": 1,
    "UserId": 1,
    "ProductId": 1,
    "ammount": 1,
  }
```

Response:

- status: 500
- cause: internal server error
- body:

```json
  {
    "message": "internal server error",
  }
```

### PUT /user/cart/:productId/increment
description: 
  update increment ammount in cart by one

Request:

- headers: access_token
- req.params.productId

Response:

- status: 200
- body:

```json
  1
```

Response:

- status: 500
- body:

```json
  {
    message: internar server error
  }
```

### PUT /user/cart/:productId/decrement
description: 
  update decrement ammount in cart by one

Request:

- headers: access_token
- req.params.productId

Response:

- status: 200
- body:

```json
  1
```

Response:

- status: 500
- body:

```json
  {
    message: internar server error
  }
```
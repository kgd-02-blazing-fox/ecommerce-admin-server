# E COMMERCE CMS

### API

List of available endpoints:
​
- `POST /admin`
- `POST /user`

- `GET /products`
- `POST /products`
- `DELETE /products/:productId`
- `GET /products/:productId`
- `PUT /products/:productId`

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
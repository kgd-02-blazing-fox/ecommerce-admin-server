# e-commerce-cms-server

**All Url :**
* **[Documentation With Postman](https://documenter.getpostman.com/view/11947207/T1DqfwF4?version=latest)**

* **[E-Commerce-CMS_Server](https://ecommerce-server-ichlas.herokuapp.com/)**

List of available endpoints:
- `POST /login`

And routes below need authentication
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `POST /chart/add`
- `GET /chart/show`
- `DELETE /chart/delete`

## API Documentation

​
List of available endpoints:
- `POST /login`

And routes below need authentication
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`


----
**User Login**
----
  Login to CMS e-commerse

* **URL**

  http://localhost:3000/users/login

* **Method:**
  
  `POST`

* **Request Headers**

   none
  
* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | STRING| true |
  | password | STRING | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTk1MzgyNTYxfQ."}
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message": "Invalid email and password" }
        ``` 

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```


----
**Create Product**
----
  Create Product

* **URL**

  http://localhost:3000/products

* **Method:**
  
  `POST`

* **Request Headers**

   | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING| true |
  
* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | STRING| true |
  | image_url | STRING | true |
  | price | INTEGER | true |
  | stock | INTEGER | true |

* **Success Response:**
  
  
  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {    
        "id": 7,
        "name": "shampo",
        "image_url": "http://shampoo-image.com",
        "price": 10000,
        "stock": 10,
        "updatedAt": "2020-07-21T22:31:26.786Z",
        "createdAt": "2020-07-21T22:31:26.786Z"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message" : "Product name is required" }
        ```

        OR

        ```json
        { "message" : "Product Image Url is required" }
        ```

        OR

        ```json
        { "message" : "Product price is required" }
        ```

        OR

        ```json
        { "message" : "Product stock is required" }
        ```

        OR

        ```json
        { "message" : "Validation min on price failed" }
        ```

        OR

        ```json
        { "message" : "Validation min on stock failed" }
        ```       


    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```


----
**Get All Product**
----
  Show all Product

* **URL**

  http://localhost:3000/products

* **Method:**
  
  `GET`

* **Request Headers**

   | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING| true |
  
* **URL Params**

   none

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    [
      {    
          "id": 7,
          "name": "shampo",
          "image_url": "http://shampoo-image.com",
          "price": 10000,
          "stock": 10,
          "updatedAt": "2020-07-21T22:31:26.786Z",
          "createdAt": "2020-07-21T22:31:26.786Z"
      }
    ]
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```

----
**Get Product**
----
  Show just one Product

* **URL**

  http://localhost:3000/products/:id

* **Method:**
  
  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING| true |
  
* **URL Params**

  Yes

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id  | INTEGER | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    [
      {    
          "id": 7,
          "name": "shampo",
          "image_url": "http://shampoo-image.com",
          "price": 10000,
          "stock": 10,
          "updatedAt": "2020-07-21T22:31:26.786Z",
          "createdAt": "2020-07-21T22:31:26.786Z"
      }
    ]
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```

----
**Update Product**
----
  Update Product

* **URL**

  http://localhost:3000/products/:id

* **Method:**
  
  `PATCH`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING| true |
  
* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | INTEGER | true |

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | STRING| true |
  | image_url | STRING | true |
  | price | INTEGER | true |
  | stock | INTEGER | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {"message": "Update Success"}
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message" : "Product name is required" }
        ```

        OR

        ```json
        { "message" : "Product Image Url is required" }
        ```

        OR

        ```json
        { "message" : "Product price is required" }
        ```

        OR

        ```json
        { "message" : "Product stock is required" }
        ```

        OR

        ```json
        { "message" : "Validation min on price failed" }
        ```

        OR

        ```json
        { "message" : "Validation min on stock failed" }
        ```       


    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```

----
**Delete Product**
----
  Delete Product

* **URL**

  http://localhost:3000/products

* **Method:**
  
  `DELETE`

* **Request Headers**

   none
  
* **URL Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | id | INTEGER | true |

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    { "message": "Deleted" }
    ```
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
        **Content:** 
        ```json
        { "message" : "Cant update/delete, because Product not found" }
        ```

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```
**User Register**
----
  Register User e-commerse

* **URL**

  http://localhost:3000/users/register

* **Method:**
  
  `POST`

* **Request Headers**

   none
  
* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | STRING| true |
  | password | STRING | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    { "message": "Succes Register User ichlasul@gmail.com " }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message": "User sudah terdaftar" }
        ``` 

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```


----
**User Add To Cart**
----
  Add To Cart

* **URL**

  http://localhost:3000/chart/add

* **Method:**
  
  `POST`

* **Request Headers**

   YES
  
* **URL Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING | true |

* **Data Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | quantity | INTEGER| true |
  | ProductId | INTEGER| true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "message": "Berhasil ditambahkan"
    }
    ```

  * **Code:** 201 CREATE <br />
    **Content:** 
    ```json
    {
      "quantity": 1,
      "ProductId": 3,
      "UserId": 13,
      "updatedAt": "2020-07-30T15:10:25.523Z",
      "createdAt": "2020-07-30T15:10:25.523Z"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message": "Invalid email and password" }
        ``` 

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```

----
**User Min Product Quantity**
----
  User min product quantity

* **URL**

  http://localhost:3000/chart/min

* **Method:**
  
  `POST`

* **Request Headers**

   YES
  
* **URL Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING | true |

* **Data Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | ProductId | INTEGER| true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "message": "Berhasil dikurangi"
    }
    ```
 
* **Error Response:**
    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message": "Kuantity gaboleh kurang dari 1" }
        ``` 
    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message": "Cant update/delete, because Product not found" }
        ``` 
    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message": "Invalid email and password" }
        ``` 

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```

----
**User Get Cart**
----
  Get User Cart

* **URL**

  http://localhost:3000/chart/show

* **Method:**
  
  `GET`

* **Request Headers**

   YES
  
* **URL Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING | true |

* **Data Params**

  no

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "charts": [
          {
              "quantity": 5,
              "UserId": 13,
              "ProductId": 5,
              "createdAt": "2020-07-30T08:04:59.707Z",
              "updatedAt": "2020-07-30T08:04:59.707Z",
              "Product": {
                  "id": 5,
                  "name": "Toy harley TOURING BREAKOUT 114",
                  "image_url": "https://testride.harley-davidson.asia/assets/img/bikes/MY18/AEM/SOFTAIL/Street-bob.png",
                  "price": 10000000,
                  "stock": 2,
                  "createdAt": "2020-07-25T08:26:56.795Z",
                  "updatedAt": "2020-07-25T08:26:56.795Z"
              }
          },
          {
              "quantity": 1,
              "UserId": 13,
              "ProductId": 3,
              "createdAt": "2020-07-30T15:10:25.523Z",
              "updatedAt": "2020-07-30T15:10:25.523Z",
              "Product": {
                  "id": 3,
                  "name": "Toy harley STREET BOB",
                  "image_url": "https://testride.harley-davidson.asia/assets/img/bikes/MY18/AEM/SOFTAIL/Street-bob.png",
                  "price": 10000000,
                  "stock": 2,
                  "createdAt": "2020-07-25T08:26:56.795Z",
                  "updatedAt": "2020-07-25T08:26:56.795Z"
              }
          },
          {
              "quantity": 13,
              "UserId": 13,
              "ProductId": 2,
              "createdAt": "2020-07-30T07:42:03.746Z",
              "updatedAt": "2020-07-30T15:13:07.617Z",
              "Product": {
                  "id": 2,
                  "name": "Toy harley FAT BOB 114",
                  "image_url": "https://testride.harley-davidson.asia/assets/img/bikes/MY20/FXFBS.png",
                  "price": 10000000,
                  "stock": 44,
                  "createdAt": "2020-07-25T08:26:56.795Z",
                  "updatedAt": "2020-07-27T01:28:39.743Z"
              }
          }
      ]
  }
    ```

 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "message": "Invalid email and password" }
        ``` 

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```

----
**User Delete Cart**
----
  Delete product from Cart

* **URL**

  http://localhost:3000/chart/delete

* **Method:**
  
  `DELETE`

* **Request Headers**

   YES
  
* **URL Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | token | STRING | true |

* **Data Params**

   | key | value | required |
  | :---: | :---: | :---: |
  | ProductId | INTEGER| true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "message": "Success delete"
    }
    ```

 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "error": "Chart not found"
        }
        ``` 

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have token" }
        ```

        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "Your token is wrong" }
        ```
        OR 
        
    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "message" : "You dont have previllege" }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "message" : "internal server error" }
        ```
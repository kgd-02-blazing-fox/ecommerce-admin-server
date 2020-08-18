# e-commerce-cms-server

**All Url :**
* **[Documentation With Postman](https://documenter.getpostman.com/view/11947207/T1DqfwF4?version=latest)**

* **[E-Commerce-CMS_Server](https://ecommerce-server-ichlas.herokuapp.com/)**

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


----

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
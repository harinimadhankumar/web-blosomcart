## user
{
    ##signup / register
    POST http://localhost:5000/api/auth/register
    Content-Type: application/json
    Body:
    {
        "name": "Harini",
        "email": "harinimadhan2005@gmail.com",
        "password": "harinim123"
    }

    ## signin / login
    POST http://localhost:5000/api/auth/login
    Content-Type: application/json
    Body:
    {
        "email": "harinimadhan2005@gmail.com",
        "password": "harinim123"
    }

    ## Test Protected Profile Route:
    GET http://localhost:5000/api/auth/profile
    Headers:
    Authorization:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTJhMWVkNWZkMDMwMmFiOWJmMTQiLCJpYXQiOjE3NTU4Nzg0MzcsImV4cCI6MTc1NjQ4MzIzN30.lrokgjRD1IiI37JFVa9ZZhtYG4bNTZVo5gN3hkFb1YQ
     
    ## send otp
    POST http://localhost:5000/api/auth/send-otp
    Content-Type: application/json
    Body:
    {
        "email": "harinimadhan2005@gmail.com"
    }
    
    ## verify otp
    POST http://localhost:5000/api/auth/verify-otp
    Content-Type: application/json
    Body:
    {
        "email": "harinimadhan2005@gmail.com",
        "otp": "438618"
    }

}

## admin
{
    ## signup / register
    POST http://localhost:5000/api/auth/make-admin
    Content-Type: application/json
    Body:
    {
        "name": "Admin",
        "email": "admin@example.com",
        "password": "admin123"
    }

    ## user to admin
    PUT http://localhost:5000/api/auth/make-admin/687ba9f7a6840e1ea4e5c424
    Headers:
    Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY

    ## signin / login
    POST http://localhost:5000/api/auth/login
    Content-Type: application/json
    Body:
    {
        "email": "admin@example.com",
        "password": "admin123"
    }

    ## Test Protected Profile Route:
    GET http://localhost:5000/api/auth/profile
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY
}

## product (admin)
{
    ## upload product
    POST http://localhost:5000/api/products
    Content-Type: application/json
    Body:
    {
        {
        "name": "Elegant Red Roses Bouquet",
        "description": "A premium bouquet of fresh red roses, hand-tied with decorative wrapping. Perfect for romantic occasions, birthdays, and anniversaries.",
        "category": "bouquet",
        "images": [
            {
            "url": "https://yourcdn.com/images/red-roses-bouquet.jpg",
            "alt": "Elegant red roses bouquet"
            },
            {
            "url": "https://yourcdn.com/images/red-roses-bouquet-side.jpg",
            "alt": "Side view of red roses bouquet"
            }
        ],
        "sizes": [
            {
            "label": "Small",
            "flowerCount": 12,
            "price": 699,
            "originalPrice": 899,
            "stock": 15
            },
            {
            "label": "Medium",
            "flowerCount": 25,
            "price": 1299,
            "originalPrice": 1599,
            "stock": 20
            },
            {
            "label": "Large",
            "flowerCount": 50,
            "price": 2299,
            "originalPrice": 2699,
            "stock": 10
            }
        ],
        "specifications": {
            "flowerType": "Roses",
            "color": "Red",
            "wrapping": "Golden decorative paper with ribbon",
            "freshness": "3 days guaranteed",
            "fragrance": "Mild natural rose fragrance"
        },
        "occasion": ["Romantic", "Birthday", "Anniversary"],
        "deliveryPincodes": ["560001", "560002", "110001"],
        "tags": ["roses", "romantic", "fresh flowers", "red"],
        "featured": true,
        "rating": 4.7,
        "numReviews": 34,
        "isAvailable": true,
        "status": "active"
        }
    }

    ## update product
    PUT http://localhost:5000/api/admin/products/68a961d6a667d7b71d4c9691
    Content-Type: application/json
    Body:
    {
        "name": "Elegant Red Roses Deluxe Bouquet"
    }
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY
    
    ## delete product
    DELETE http://localhost:5000/api/admin/products/68a961d6a667d7b71d4c9691
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY

    ## get all products 
    GET http://localhost:5000/api/admin/products
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY
}

## order 
{
    ## user
    {
        ## post order
        POST http://localhost:5000/api/orders
        Headers:
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTJhMWVkNWZkMDMwMmFiOWJmMTQiLCJpYXQiOjE3NTU4Nzg0MzcsImV4cCI6MTc1NjQ4MzIzN30.lrokgjRD1IiI37JFVa9ZZhtYG4bNTZVo5gN3hkFb1YQ

        Content-Type: application/json
        Body:
        {
            "shippingAddress": {
                "name": "Harini",
                "street": "123 Main Street",
                "city": "Chennai",
                "state": "Tamil Nadu",
                "pincode": "600001",
                "country": "India",
                "phone": "9876543210"
            },
            "items": [
                {
                "product": "68a961d6a667d7b71d4c9691",
                "sizeLabel": "Medium",
                "quantity": 1,
                "price": 1299
                }
            ],
            "subtotal": 1299,
            "tax": 233.82,
            "shippingCost": 0,
            "discount": 0,
            "total": 1532.82,
            "paymentMethod": "stripe",
            "paymentStatus": "pending",
            "status": "pending"
            }
        }

        ## get orders 
        GET http://localhost:5000/api/orders/my-orders
        Headers:
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTJhMWVkNWZkMDMwMmFiOWJmMTQiLCJpYXQiOjE3NTU4Nzg0MzcsImV4cCI6MTc1NjQ4MzIzN30.lrokgjRD1IiI37JFVa9ZZhtYG4bNTZVo5gN3hkFb1YQ

        ## get orders by id
        GET http://localhost:5000/api/orders/68a963e7a667d7b71d4c96c4
        Headers:
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTJhMWVkNWZkMDMwMmFiOWJmMTQiLCJpYXQiOjE3NTU4Nzg0MzcsImV4cCI6MTc1NjQ4MzIzN30.lrokgjRD1IiI37JFVa9ZZhtYG4bNTZVo5gN3hkFb1YQ
    }

    ## admin
    {
        ## Get all orders
        GET http://localhost:5000/api/admin/orders
        Headers:
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY
    
        ## Update Order Status
        PUT http://localhost:5000/api/admin/orders/687c87401109419df5ffd9af
        Headers:
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY
    
        Content-Type: application/json
        Body:
        {
            "status": "shipped"
        }

        ## Get status 
        GET http://localhost:5000/api/orders/admin/status/shipped
        GET http://localhost:5000/api/orders/admin/status/confirmed
        GET http://localhost:5000/api/orders/admin/status/cancelled
        Headers:
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE4OTUxZGVkNWZkMDMwMmFiOWJmMWQiLCJpYXQiOjE3NTU4Nzg4OTgsImV4cCI6MTc1NjQ4MzY5OH0.fr8CDXOHTRjl5-Fc6UR6EJzBuRTwKjFUESIgri6E3uY
    }
}

## payment
{
    ## Create payment intent 
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc

    Content-Type: application/json
    Body:
    { 
        "amount": 20648.82 
    }

    ## Update payment status
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc

    Content-Type: application/json
    Body:
    {
        "paymentStatus": "paid",
        "paymentDetails": {
            "paymentId": "pi_123456789",
            "method": "stripe"
        }
    }
}

## category
{
    ## add cart
    POST http://localhost:5000/api/cart/add
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc

    Content-Type: application/json
    Body:
    {
        "productId": "687bec0b6fdbd6f1e9363dd0",
        "quantity": 2,
        "roomSize": {
            "length": 12,
            "width": 12,
            "height": 10
        }
    }

    ## view cart
    GET http://localhost:5000/api/cart
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc

    ## Update cart
    PUT http://localhost:5000/api/cart/update
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc

    Content-Type: application/json
    Body:
    {
        "productId": "687bec0b6fdbd6f1e9363dd0",
        "quantity": 3,
        "roomSize": {
            "length": 14,
            "width": 14,
            "height": 10
        }
    }

    ## Delete cart
    DELETE http://localhost:5000/api/cart/remove/687bec0b6fdbd6f1e9363dd0
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc
}

## Reviews
{
    ## post Reviews
    POST http://localhost:5000/api/reviews
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc

    Content-Type: application/json
    Body:
    {
        "productId": "687ba058493b023e106626b0",
        "rating": 4,
        "title": "Stylish and Durable",
        "comment": "Fits perfectly in my living room. Great build quality!"
    }

    ## View reviews
    GET http://localhost:5000/api/reviews/product/687bec0b6fdbd6f1e9363dd0
}

## refund
{
    ## refund by order id
    POST http://localhost:5000/api/refund
    Headers:
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiZGQyY2QzMDg3Y2I5YWRiNWRiYzQiLCJpYXQiOjE3NTI5OTI5ODEsImV4cCI6MTc1MzU5Nzc4MX0.lIFYN0qkdgx0U9L1RQWtW6OPCV_bMmap5O6_Kc6kAfc
    Content-Type: application/json
    Body:
    {
        "paymentIntentId": "pi_3RmqQqI1VdVbVxxV1sU6F2ic"
    }
}
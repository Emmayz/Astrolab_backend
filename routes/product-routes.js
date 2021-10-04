const express = require('express');
const router = express.Router();
const ProductModel = require('../model/ProductModel');

// Route for contact/
router.get('/test',
    function (req, res) {

        // (1) Product in database
        let products = [
            {
                'brand': 'Apple',
                'model': 'iPhone 13',
                'price': 5000
            },
            {
                'brand': 'Apple',
                'model': 'iPhone 12',
                'price': 3000
            },
            {
                'brand': 'Samsung',
                'model': 'S20',
                'price': 4000
            }
        ];

        // (2) Filter the products
        function theFilter(product) {
            if (
                product.brand === req.query.brand &&
                product.price <= req.query.price  
            ) {
                return product
            }
        }

        let filteredProducts = products.filter(theFilter);


        // (3) For filtered products, create HTML code
        function createListItem(product) {
            return `
                <li>
                    <p>Brand: ${product.brand}</p>
                    <p>Model: ${product.model}</p>
                    <p>Price: ${product.price}</p>
                </li>
            `
        }

        


        res.send(`
            <h1>Products</h1>
            ` +
            filteredProducts.map(createListItem)
        )
    }
);

router.post('/create',            // http://localhost:3001/products/create/
    function(req, res) {
        
        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            description: req.body.description
        };

        ProductModel
        .create(formData)
        .then(
            function(dbDocument) {
                res.send(dbDocument);

            }
        )
        .catch(
            function(mongooseError) {
                console.log(mongooseError)
                res.send("Error occured. Check the shell");
            }
        )

    }
);

router.get('/find',
    function(req, res) {

        let brandQuery = req.query.brand;
        let priceQuery = req.query.price;

        ProductModel
        .find({ price: { $gte: priceQuery } })
        .then(
            function(dbDocument) {
                res.send(dbDocument)
            }
        )
        .catch(
            function(mongooseError) {
                console.log(mongooseError)
                res.send("Error occured. Check the shell.");
            }
        )

    }
);

module.exports = router;
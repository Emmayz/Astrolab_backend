// Import the express function
const express = require('express'); 
const  mongoose  = require('mongoose');
// Import CORS - cross origin
const cors = require('cors')
// express() returns an object with all kinds
// of methods for handling HTTP requests
const server = express();
// donenv for reading environment variables
require('dotenv').config();

// Import the user routes
const userRoutes = require('./routes/user-routes.js');
// Import the product routes
const productRoutes = require('./routes/product-routes');



// Connect to MongoDB using mongoose
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
.connect(connectionString, connectionConfig)
.then(
    function() {
        console.log("DB is connected");
    }
)
.catch(
    function(dbError) {
        console.log("error occured", dbError)
    }
);


// Configuration
// Configure for Post request
server.use( express.urlencoded({ extended: false }) );
//Configure for JSON format
server.use( express.json() );
// Configure cors
server.use( cors() );
// Configure for Routes
server.use('/users', userRoutes);
server.use('/products', productRoutes)


// A GET route
server.get(
    '/', // document
    function (req, res) { //callback function
        res.send("<h1>Welcome Home</h1>");
    }
);


server.get(
    '/blog/:year/:month/:day/:title',
    function(req, res) {

        let year = req.params.year;
        let month = req.params.month;
        let day = req.params.day;
        let title = req.params.title;

        res.send(
            `
                <h1>Blog</h1>
                <p>Date: ${day}/${month}/${year}</p>
                <h2>${title}</h2>
            `
        )
    }
);




server.listen(
    3001,
    function() {
        console.log('Server running on http://localhost:3001/')
    }
);
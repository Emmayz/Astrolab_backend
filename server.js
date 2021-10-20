// Import the express function
const express = require('express'); 
const mongoose = require('mongoose');
// CORS is Cross-Origin Resource Sharing
const cors = require('cors');
// dotenv for reading environment variables
require('dotenv').config();
// Import cloudinary
const cloudinary = require('cloudinary').v2;
// Import express-form-data
const expressFormData = require('express-form-data');
// express() returns an object with all kinds
// of methods for handling HTTP requests
const server = express();

// Import passport
const passport = require('passport');
// Import the strategies & way to extract the jsonwebtoken
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// The same secret in routes/UsersRoutes will be needed
// to read the jsonwebtoken
const secret = process.env.SECRET;

// Options for passport-jwt
const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

// This function is what will read the contents (payload) of the jsonwebtoken
const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions, 
            (jwtPayload, done) => {

                // Extract and find the user by their id (contained jwt)
                UsersModel.findOne({ _id: jwtPayload.id })
                .then(
                    // If the document was found
                    (document) => {
                        return done(null, document);
                    }
                )
                .catch(
                    // If something went wrong with database search
                    (err) => {
                        return done(null, null);
                    }
                )
            }
        )
    )
};

// Invoke passportJwt and pass the passport npm package as argument
passportJwt(passport);

// Import the user routes
const userRoutes = require('./routes/user-routes.js');
// Import the product routes
const productRoutes = require('./routes/product-routes.js');



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

// Configuration for Cloudinary
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
);


// Configuration for Express
// Configure for POST request
server.use( express.urlencoded({ extended: false }) );
// Configure for JSON format
server.use( express.json() );
// Configure for CORS
server.use( cors() );
// Configure or form data
server.use( expressFormData.parse() );
// Configure for routes
server.use(
    '/users', 
    userRoutes
);

server.use(
    '/products', 
    //passport.authenticate('jwt', {session:false}),
    productRoutes
);


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
    process.env.PORT || 3001,
    function() {
        console.log('Server running on http://localhost:3001/')
    }
);
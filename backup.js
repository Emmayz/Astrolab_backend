// Another GET route
server.get(
    '/about',
    function (req, res) {
        res.send('<h1>About Us</h1><p>Our company...</p>');
    }
);


// Route for contact
server.get(
    '/contact',
    function (req, res) {
        res.send('<h1>Contact Us</h1>')
    }
);

// Route for contact
server.get(
    '/terms-and-conditions',
    function (req, res) {
        res.send('<h1>T&Cs</h1>')
    }
);

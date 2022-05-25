// *************************************************************
//
//  ---- GROCERIES APP ----
//  Coded by: Todd Brotze
//  Version: 2.1 (25 May, 2022, 9:30am PDT)
//
//  Files to modify to run in LOCAL or HEROKU environments:
//      - client/src/axios/Axios-Config: baseURL
//      - server: FileStore
//
// *************************************************************



// ----------  IMPORTS & ASSIGNMENTS ---------------


const Express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const FileStore = require('session-file-store')(session);

// Redis Configuration
// let RedisStore = require('connect-redis')(session);
// const { createClient } = require('redis');
// let redisClient = createClient({
//         // url: process.env.REDIS_URL,
//         // legacyMode: true
//     });
// redisClient.connect().catch(console.error);



// Development .env
require('dotenv').config();


// Login to database
const dB = require('./config/database');


// Initialize app
const app = Express();


// Import & Configure Passport
const passport = require('passport');
require('./config/passport')(passport);


// Connect to dB
dB.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('dB authentication error: ' + err));



// ----------  MIDDLEWARE FUNCTIONS ---------------


// Parsers
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cookieParser(process.env.CREDENTIAL_SECRET));

// CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));

// Express Session for storing Session IDs
app.use(session({
    store: new FileStore(),
    secret: process.env.CREDENTIAL_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    }
}));

// Set up authentication: Passport Local Strategy
app.use(passport.initialize());
app.use(passport.session());


// Set no-cache response on all routes
app.use(function(req,res,next){
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.
    next();
});



// ----------  RUN SERVER ---------------


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));



// ----------  API ENDPOINTS ---------------

// Login/Logout Endpoint
app.use('/login', require('./routes/login'));


// Verify authentication for all API routes
app.use('/api', function(req,res,next){
    if (req.isAuthenticated()) {
        console.log('User Verified');
        // console.log(req.user + req.sessionID);
        next();
    }
    else {
        console.log('*** User Not Authenticated ***');
        res.status(401).end();
    }
});


// API Endpoints
app.use('/api/where-to', require('./routes/whereTo'));
app.use('/api/shopping-list', require('./routes/shoppingList'));
app.use('/api/stores', require('./routes/manageStores'));


// Write active sessions to localhost:5000
// app.get('/', function(req, res, next) {
//     res.send(req.sessionStore.sessions);
//     next();
// });



// ----------  FOR PRODUCTION ---------------



// Serve static assets if in PRODUCTION
if (process.env.NODE_ENV === 'production') {
    app.use(Express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
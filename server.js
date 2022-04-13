// *************************************************************
//
//  ---- GROCERIES APP ----
//  Coded by: Todd Brotze
//  Version: 1.0 (12 April, 2022 10:00pm PDT)
//
//  Files to modify to run in LOCAL or HEROKU environments:
//      - client/src/axios/Axios-Config: baseURL
//      - config/database: dB instance
//      - server: FileStore
//
// *************************************************************



// ----------  IMPORTS & INSTANTIATIONS ---------------



const Express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const FileStore = require('session-file-store')(session);

// Redis Configuration
// const redis = require('redis');
// const client = redis.createClient({
//         url: process.env.REDIS_URL
//     });
// const RedisStore = require('connect-redis')(session);


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



// ----------  MIDDLEWARE ---------------



app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cookieParser(process.env.CREDENTIAL_SECRET));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));


app.use(session({
    store: new FileStore(),
    secret: process.env.CREDENTIAL_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    }
}));


app.use(passport.initialize());
app.use(passport.session());


app.use('/current-list', require('./routes/currentList'));
app.use('/update-list', require('./routes/updateList'));
app.use('/stores', require('./routes/manageStores'));
app.use('/items', require('./routes/manageItems'));
app.use('/login', require('./routes/login'));



// ----------  EXECUTION ---------------



// Serve static assets if in PRODUCTION
if (process.env.NODE_ENV === 'production') {
    app.use(Express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
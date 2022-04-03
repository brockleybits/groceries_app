// Imports
const Express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
require('dotenv').config();


// Login to database
const dB = require('./config/database');


// Initialize app & set PORT
const app = Express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

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
    // store: new FileStore,
    secret: process.env.CREDENTIAL_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/current-list', require('./routes/currentList'));
app.use('/update-list', require('./routes/updateList'));
app.use('/stores', require('./routes/manageStores'));
app.use('/items', require('./routes/manageItems'));
app.use('/deselect-items', require('./routes/deselectItems'));
app.use('/edit-item', require('./routes/editItem'));
app.use('/login', require('./routes/login'));



// Faux Get call returned to Server (:5000)
// app.get('/', (req,res,next) => {
//     res.send(req.session);
//     next();
// });
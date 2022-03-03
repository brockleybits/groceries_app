// Set up and run Express web server, and import CORS
const Express = require('express');
const cors = require('cors');


// Login to database
const dB = require('./config/database');


// Initialize app, select port, listen for server
const app = Express();
const port = process.env.port || 5000;
app.listen(port, console.log(`Server running on port ${port}`));


// Cross-Origin-Resource-Sharing
app.use(cors({
    origin: "http://localhost:3000"
  }));


// Connect to dB
dB.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('dB authentication error: ' + err));


// JSON parser middleware
app.use(Express.json());


// Faux Get call returned to Server (:5000)
app.get('/', (req,res) => {
    res.send('Welcom to the new & improved Groceries server!!');
});


// Routes to endpoints, returned to Client (:3000)
app.use('/current-list', require('./routes/currentList'));
app.use('/update-list', require('./routes/updateList'));
app.use('/stores', require('./routes/manageStores'));
app.use('/items', require('./routes/manageItems'));
app.use('/deselect-items', require('./routes/deselectItems'));
app.use('/edit-item', require('./routes/editItem'));


// React
import React from 'react';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Component
import Main from './components/Main';
import NavMenu from './components/NavMenu';

// Main App
const App = () => {
    return (
        <div>
            <NavMenu />
            <div className="container-fluid">
                <Main />
            </div>
        </div>
    )
};

export default App;

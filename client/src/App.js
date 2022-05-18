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
            {
                window.location.pathname === '/' ? 
                    <div className="welcome-masthead">
                        <h1><span>Welcome to</span><br />Groceries</h1>
                    </div>
                     : 
                     <NavMenu />
            }
            <div className="container-fluid">
                <Main />
            </div>
        </div>
    )
};

export default App;

import React from 'react';
import './App.css';
import ProductActions from './ProductAction';
import logo from './logo.png';
import GmailWidget from './emailplugin'; // Adjust the path as necessary
import './App.css';


function App() {
    return (
        <div className="App">
            <a href="https://github.com/IAM-Nitesh/ProductService.git" style={{
                position: 'absolute',
                top: '0',
                left: '0',
                padding: '10px',
                backgroundColor: 'transparent',
                textDecoration: 'aqua',
                color: 'black'
            }}>Git : IAM-Nitesh </a>
            <div className="titleContainer">
                <img src={logo} alt="Logo" className="logo" style={{marginTop: '10px'}}/>
                <h1>Product Service UI</h1>
            </div>

            <ProductActions/>
        </div>
    );
}

export default App;
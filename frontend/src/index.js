import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import Store from './store/store'

const app = (
    <React.StrictMode>
        <Store>
            <Router>
                <Route path='/' component={App} />
                <Route path='/:name' component={App}/>
            </Router>
        </Store>
    </React.StrictMode>
)

ReactDOM.render( app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

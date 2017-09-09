import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ExchangePage from './../../pages/Exchange';
import './index.css';

const App = () => {
    return (
        <div className="root">
            <Switch>
                <Route path="/" component={ExchangePage} />
            </Switch>
        </div>
    );
};

export default App;


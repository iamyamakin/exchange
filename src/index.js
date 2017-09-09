import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import store from './store'
import App from './containers/App';

const rootElement = document.getElementById('root-container');

const renderApp = App => {
    render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        rootElement
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        return renderApp(App);
    });
}

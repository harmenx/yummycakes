import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { routes } from './routing/routes';

function App() {
  return (
    <BrowserRouter>
        {routes.map(page => {
          return (
            <Route
              key={page.id}
              path={page.path}
              component={page.component}
              exact={page.exact}
            />
          )
        })}
    </BrowserRouter>
  );
}

export default App;

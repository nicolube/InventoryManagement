import React from 'react';
import ReactDOM from 'react-dom';
import ItemSite from './components/ItemSite';
import Header from './components/header';
import Footer from './components/footer';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CheckoutSite from './components/CheckoutSite';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import LoginSite from './components/LoginSite';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path="/login"><LoginSite/></Route>
          <Route path="/checkout"><CheckoutSite/></Route>
          <Route path="/"><ItemSite /></Route>
        </Switch>
      </Container>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

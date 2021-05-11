

import ItemSite from './components/ItemSite';
import Header from './components/header';
import Footer from './components/footer';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CheckoutSite from './components/CheckoutSite';
import { Container } from 'react-bootstrap';
import LoginSite from './components/LoginSite';
import React, { useState } from 'react';

const App = () => {

    const [login, setLogin] = useState(false)
    return (
      <React.StrictMode>
        <Router>
          <Header login={login} setLogin={setLogin}/>
          <Container>
            <Switch>
              <Route path="/login"><LoginSite setLogin={setLogin}/></Route>
              <Route path="/checkout"><CheckoutSite/></Route>
              <Route path="/"><ItemSite /></Route>
            </Switch>
          </Container>
          <Footer />
        </Router>
      </React.StrictMode>
    )
  }
  
  export default App
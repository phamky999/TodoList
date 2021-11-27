import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddContact from './components/contacts/AddContact';
import UpdateContact from './components/contacts/UpdateContact';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Albumsv1 from './components/pages/Albumsv1';
import Albumsv2 from './components/pages/Albumsv2';
import Albumsv3 from './components/pages/Albumsv3';

import NotFound from './components/pages/NotFound';
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-contact" component={AddContact} />
        <Route exact path="/update-contact/:contactID" component={UpdateContact} />
        <Route exact path="/albums-v1" component={Albumsv1} />
        <Route exact path="/albums-v2" component={Albumsv2} />
        <Route exact path="/albums-v3" component={Albumsv3} />

        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

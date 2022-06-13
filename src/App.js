
import './App.css';
import React, { useEffect } from "react";
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route }from 'react-router-dom';
import Shoes from './Shoes';
import Login from './Login';
import { useStateValue } from './StateProvider';
import {auth} from './firebase'
import Update from './Update';

function App() {

  const [{}, dispatch] = useStateValue("");
  
  useEffect(() => {
   
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS>>>', authUser)

      if(authUser) {


          
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {

        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })
  }, [])
  
  return (
    <Router>
    <div className="App">
      
     <Switch>
    
     <Route path='/update'>
         <Header />
         <Update />
       </Route>
       <Route path='/shoes'>
         <Header />
         <Shoes />
       </Route>
       <Route path='/login'>
         <Login />
       </Route>
       <Route path='/'>
          <Header />
          <Home />
       </Route>
     </Switch>
    </div>
      
    </Router>
  );
}

export default App;

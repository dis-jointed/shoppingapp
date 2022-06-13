import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import './Header.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { auth } from './firebase';
import { Link } from 'react-router-dom';

function Header( ) {

    const [{ basket, user }, dispatch] = useStateValue();
   const [Open, setOpen] = useState(false); 
    
    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }
    }

    return (
        <div className='header'>

            <h3 className='name'>Hello, {user ? user?.email.split("@")[0] : "Guest"}</h3>

             <CurrencyFormat
              renderText={(value) => (
                  <>

                    <p className='header__basket'>
                        Subtotal ({basket?.length} items):
                        <strong>{value}</strong>
                    </p>
                    
                    </>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              /> 

            <Link to={!user && '/login'}>
             <button className='button__login' onClick={handleAuthentication} variant="outlined" color="primary">
                 {user ? "Sign out" : "Login"}
              </button>
             </Link>

             <Link to='/update'>
             {user?.email == 'terencejumba@gmail.com' && <button onClick={e => setOpen(e.target.value)} >update</button>}
             </Link>
        </div>
    )
}

export default Header

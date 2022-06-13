import { Button } from '@material-ui/core'
import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product({id, title, image, price}) {

    const [{ basket }, dispatch] = useStateValue();
    const addToBasket =() => {
        //dispatching item into data layer
        dispatch({
            type: 'ADD_TO_BASKET', 
            item: {
                id: id,
                title: title, 
                image: image,
                price: price,
                
            },
        })
        
    }

    return (
        <div className='product'>
            <div class="overlay"></div>
            <img className='product__image' src={image} />
            <p className='name__product'>{title}</p>
            <p className='price__product'><strong>{price}</strong></p>
            <button className='add__cart' onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}

export default Product

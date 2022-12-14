import React from 'react'
import {Link as LinkRouter, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { current } from 'daisyui/src/colors';

const ShoppingCart = () => {

  const cart = useSelector((state) => state.cart.cart.cart)
 
  const addition = (acc, currentValue) => {
    return acc+currentValue.price*currentValue.quantity
  }
  
  let total = cart.reduce(addition, 0);

  return (
<div tabIndex={0} className="mt-3 bg-[#360027] flex justify-center rounded-xl items-center card-compact dropdown-content w-52" onClick={onclick} >

<div className="card-body bg-[#360027] rounded-xl" >
                        <span className="font-bold text-xl">{cart.length} items</span>
                        <span className="text-info text-xl">$ {total}</span>
                        <div className="card-actions">
                            <LinkRouter className="bG-color btn btn-block" to="/cart">View cart</LinkRouter>
                        </div>
                    </div>
                  
</div>
  )
}

export default ShoppingCart
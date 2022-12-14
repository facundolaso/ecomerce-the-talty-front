import React, { useEffect, useRef, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import '../styles/CartPage.css'
import { Link as LinkRouter } from 'react-router-dom'
import { useGetNewCartMutation, useMakePaymentMutation } from '../features/buyAPI'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeCart, decrementQuantity, newOrder } from '../features/cartSlice'
import { toast } from 'react-toastify';
import { codeTrue } from '../features/codeSlice'
import { useNavigate } from 'react-router-dom'

export default function CartPage({ coupon }) {

    let navigate = useNavigate()

    let couponCode = coupon?.response?.[0]?.couponCode;
    let couponDiscount = coupon?.response?.[0]?.discount;

    const dispatch = useDispatch()

    let cart = useSelector((state) => state.cart.cart.cart)

    let order = useSelector((state) => state.cart.cart.orderNumber)

    const addition = (acc, currentValue) => {
        return acc + currentValue.price * currentValue.quantity
    }

    const code = useSelector((state) => state.code.codeState)

    const codeRef = useRef()

    let subTotalCart = cart.reduce(addition, 0)

    let totalWithDiscount = Math.trunc(subTotalCart - (couponDiscount * subTotalCart) / 100)

    const applyDiscount = () => {
        if (codeRef.current.value.toUpperCase() == couponCode) {
            console.log(subTotalCart)
            dispatch(codeTrue())
            toast.success('Discount applied');
        } else {
            toast.error('Incorrect code');
        }
    }

    useEffect(() => {
        if (subTotalCart == 0) {
            toast.warning("0 items in your shopping cart")
        } else {
            if (order == 0) {
                dispatch(newOrder(Math.floor(Math.random() * 1000000)))
            }
        }
    }, [subTotalCart])

    const [newCart] = useGetNewCartMutation()
    const [makePayment] = useMakePaymentMutation()

    /* Pasarela de pagos */

    const user = useSelector((state) => state.logged.user);

    const handlePay = async () => {
        let cartOrder = {
            user: user?.id,
            items: cart,
            shipping: 'free',
            total: subTotalCart,
            amount: !code ? 0 : couponDiscount,
            totalBuy: !code ? subTotalCart : totalWithDiscount
        }

        await newCart(cartOrder)
            .then((res) => {
                dispatch(removeCart())
            })

        await makePayment(cartOrder)
            .then((res) => {
                window.open(res.data.init_point)
                // navigate(res.data.init_point)
            })
    }

    /* ---------------------------------- */

    let tbody = (product) => (
        <tr key={product.id} >
            <td className='lol'>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={product.photo[0]} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{product.title}</div>
                        <div className="text-sm opacity-50 flex gap-1">
                            <p className='unitPrice text-md'>${product.price}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className='lol'>
                {product.brand}
            </td>
            <td className='text-center quantity lol'>{product.quantity}
                <p></p>
                <button className="btnAdd btn w-10" onClick={() => dispatch(addToCart(product))}>+</button>
                <button className="btnRemove btn w-10" onClick={() => dispatch(decrementQuantity(product))}>-</button>
            </td>
        </tr>
    )

    return (
        <PageLayout>
            <div className='flex items-center cart-container p-5 text-white h-full'>
                <div className="flex flex-col w-full h-full lg:flex-row font-['Open_Sans']">
                    <div className="xd grid flex-grow h-full card cart-card rounded-box place-items-center">
                        <ul className="steps p-4">
                            <li className="step step-primary mx-2 text-xs md:text-base">Choose products</li>
                            <li className="step step-primary mx-2 text-xs md:text-base">Confirm payment</li>
                            <li className="step mx-2 text-xs md:text-base">Pay</li>
                            <li className="step mx-2 text-xs md:text-base">Order end</li>
                        </ul>
                        <div className="overflow-x-auto w-full font-['Open_Sans']">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className='xdd'>Product</th>
                                        <th className='xdd'>Name</th>
                                        <th className='text-center xdd'>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-black'>
                                    {cart.map(tbody)}
                                </tbody>
                            </table>
                            {cart.length > 0 ? <div className="flex justify-center items-center bg-#360027">
                                <button className="btn m-3 text-white" onClick={() => dispatch(removeCart())}>Empty cart</button>
                            </div> : null}
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="xd flex flex-grow card cart-card rounded-box p-4 justify-center gap-5 items-center font-['Open_Sans']">
                        <div className='flex flex-col gap-3 justify-center items-center'>
                            <img width={100} src="/logo-white.png" alt="" />
                            <h2 className='text-white'>Order: {subTotalCart == 0 ? null : '#' + order}</h2>
                            <p className='text-white'>{new Date().getDate() + ' / ' + (new Date().getMonth() + 1) + ' / ' + new Date().getFullYear()}</p>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className="cart-summary-body mt-2 flex flex-col justify-center gap-5 font-['Open_Sans']">
                                <div className='flex p-3 justify-between'>
                                    <p>Name product</p>
                                    <div>
                                        {cart.map((item) =>
                                            <>
                                                <p>{item?.brand}</p>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        {cart.map((item) =>
                                            <>
                                                <p>${item?.price * item.quantity}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className='flex p-3 justify-between'>
                                    <div className="flex flex-col justify-between align-center gap-2 font-['Open_Sans']">
                                        <p>Subtotal</p>
                                        <p>Discount *cupon*</p>
                                        <p className='font-bold'>Total</p>
                                    </div>
                                    <div className="flex flex-col justify-center align-center gap-2">
                                        <p>$ {subTotalCart}</p>
                                        <div className="flex flex-wrap md:flex-nowrap justify-center items-center ">
                                            {code == false ? <input type="text" placeholder="Enter code" ref={codeRef} className="input w-32" /> : <input type="text" placeholder="Enter code" ref={codeRef} disabled className="input w-32" />}

                                            {code == false ? <button onClick={applyDiscount} className="h-1 ml-1 btn w-12 text-white">
                                                Add
                                            </button> : null}
                                        </div>
                                        <p>${!code ? subTotalCart : <>{totalWithDiscount}<span className="badge badge-lg">{coupon?.response?.[0].discount} %OFF</span></>}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                {/* <LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/pay'}>Place order</LinkRouter> */}
                                <button className="btn text-white" onClick={handlePay}>Pay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

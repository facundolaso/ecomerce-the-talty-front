import React from 'react'
import PageLayout from '../components/layout/PageLayout'
import '../styles/CartPage.css'
import { Link as LinkRouter } from 'react-router-dom'

export default function CartPage() {


    const data = [
        {
            id: 1,
            title: "Watch",
            description: "descripcion reloj",
            image: "https://www.woodenson.cl/wp-content/uploads/sites/2/2021/10/DSC_0127-600x600.jpg",
            price: 1000,
            quantity: 2
        },
        {
            id: 2,
            title: "Sunglasses",
            description: "descripcion anteojos",
            image: "https://cdn.shopify.com/s/files/1/0270/6663/0217/products/711426.jpg?v=1634050720",
            price: 1000,
            quantity: 2
        },
        {
            id: 3,
            title: "backpack",
            description: "descripcion mochila",
            image: "https://i0.wp.com/chevyproductos.cl/wp-content/uploads/mochila-rolltop-40-lt-negra.jpg?resize=400%2C400&ssl=1",
            price: 1000,
            quantity: 2
        },
    ]

    let tbody = (product) => (
        <tr key={product.id}>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={product.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{product.title}</div>
                        <div className="text-sm opacity-50">$: {product.price}</div>
                    </div>
                </div>
            </td>
            <td>
                {product.description}
            </td>
            <td className='text-center'>{product.quantity}</td>
        </tr>
    )
    return (
        <PageLayout>
            <div className='flex items-center cart-container p-5 text-white h-full'>
                <div className="flex flex-col w-full h-full lg:flex-row">
                    <div className="grid flex-grow h-full card cart-card bg-base-300 rounded-box place-items-center">
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th className=''>Product</th>
                                        <th className=''>description</th>
                                        <th className='text-center'>quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(tbody)}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="flex flex-grow card cart-card rounded-box p-4 justify-start gap-5 items-center">
                        <div className='flex flex-col gap-3 justify-center items-center'>
                            <img width={100} src="/logo-white.png" alt="" />
                            <h2 className='text-white'>Order: #0000</h2>
                            <p className='text-white'>05/10/22</p>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className="cart-summary-body mt-2 flex flex-col justify-center gap-5">
                                <div className='flex p-3 justify-between'>
                                    <p>Nombre del producto</p>
                                    <p>$ 000000</p>
                                </div>
                                <div className='flex p-3 justify-between'>
                                    <div>
                                        <p>Subtotal</p>
                                        <p>Discount *cupon*</p>
                                        <p className='font-bold'>Total</p>
                                    </div>
                                    <div>
                                        <p>$ 000000</p>
                                        <p>$ 000000</p>
                                        <p>$ 000000</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                            <LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/pay'}>Place order</LinkRouter>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

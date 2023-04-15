import React from "react";
import { useContext, useEffect, useState,  } from "react";
import { Button, Container, Navbar, Nav, Row, Col, Table } from 'react-bootstrap';
import { configureStore, useSelector, useDispatch } from "react-redux/es/exports";
import { addCount, deleteItem, changeName, increaseAge } from "./../store.js"

const Cart = (props) => {

    let state = useSelector((state) => state)

    let dispatch = useDispatch()


    return (
        <div>

            {state.user.name} {state.user.age} 의 장바구니
            <button onClick={()=>{dispatch(increaseAge(2))}}>age</button>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID#</th>
                        <th>Product Name</th>
                        <th>Stock</th>
                        <th>Change</th>
                    </tr>
                </thead>

                <tbody>
                    {state.cartContent.map((product, index) => (
                        <tr key={product.id}>
                            <td>{state.cartContent[index].id}</td>
                            <td>{state.cartContent[index].name}</td>
                            <td>{state.cartContent[index].count}</td>
                            <td>
                                <div className="button-group">
                                    <button onClick={() => {
                                        dispatch(addCount({ id: product.id }))
                                    }}>
                                        Add
                                    </button>
                                    <button onClick={()=>{
                                        dispatch(deleteItem({id: product.id}))
                                    }}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>
        </div>
    )
}


export default Cart;
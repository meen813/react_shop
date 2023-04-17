import React from "react";
import { useContext, useEffect, useState, memo } from "react";
import { Button, Container, Navbar, Nav, Row, Col, Table } from 'react-bootstrap';
import { configureStore, useSelector, useDispatch } from "react-redux/es/exports";
import { addCount, deleteItem, changeName, increaseAge } from "./../store.js"

// 자식 컴포넌트 재렌더링 막기 or 꼭 필요할 때만 재렌더링 하려면 memo, memo로 재렌더링오래걸리는 컴포넌트 감싸 놓으면 좋음.
// 작동원리 : props가 변할때만 재렌더링해줌
// function Child(){
//     console.log('재렌더링됨')
//     return <div>자식임</div>
// }

// let Child = memo(function(){
//     console.log('재렌더링됨')
//     return <div>자식임</div>
// })



const Cart = (props) => {

    let state = useSelector((state) => state)
    let dispatch = useDispatch()
    let [count, setCount] = useState(0);


    return (
        <div>
            <button onClick={()=>{ setCount(count+1)}}>+</button>
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
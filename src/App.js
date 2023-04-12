import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { createContext, useState, useEffect } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './components/Detail';
import Cart from './components/Cart';
import styled from 'styled-components';
import axios from 'axios';

//Context API 
export let Context1 = createContext()

function App() {
  let [shoes, setShoes] = useState(data)
  let [image, setImage] = useState([
    "/img/shoes1.jpg",
    "/img/shoes2.jpg",
    "/img/shoes3.jpg",
    "/img/shoes4.jpg",
    "/img/shoes5.jpg",
    "/img/shoes6.jpg",
    "/img/shoes7.jpg",
    "/img/shoes8.png",
    "/img/shoes9.png"
  ])
  let [countServer, setCountServer] = useState(0);
  let [loading, setLoading] = useState(false);
  
  let [stock] = useState([10, 11, 12])

  let navigate = useNavigate();

  const sortProductsAlphabetically = () => {
    const sortedShoes = [...shoes].sort((a, b) => a.title.localeCompare(b.title));
    setShoes(sortedShoes);
  }



  return (
    <div className="App">

      <Navbar bg="light" variant="light" className=''>
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event/one') }}>Event</Nav.Link>
            <Button variant="outline-primary" onClick={sortProductsAlphabetically}>Alphabetically Sort</Button>{' '}
          </Nav>
        </Container>
      </Navbar>


      {/* <Link to="/">Home</Link> <br></br>
      <Link to="/detail">Detail</Link>       */}

      <div className='main-bg'></div>

      <Routes>
        <Route path="/" element={<div>
          <Container>
            <Row>
              {shoes.map(function (shoe, index) {
                return (
                  <Col sm={6} md={4} key={index}>
                    <Product
                      shoes={shoes[index]}
                      image={image[index]}
                    />
                  </Col>
                )
              })}
            </Row>
            {/* 서버 통신 */}
            <button onClick={() => {

              setLoading(true);

              if (countServer === 0) {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((response) => {
                    // 가져온 데이터를 기존의 로컬 데이터에 추가함
                    const mergedShoes = [...shoes, ...response.data];
                    setShoes(mergedShoes);
                  })
                  .catch((error) => {
                    console.log('failed', error)
                  })
                setCountServer(countServer + 1)
                setLoading(false); // 로딩 상태를 해제함
              }
              if (countServer === 1) {
                axios.get('https://codingapple1.github.io/shop/data3.json')
                  .then((response) => {
                    // 가져온 데이터를 기존의 로컬 데이터에 추가함
                    const mergedShoes = [...shoes, ...response.data];
                    setShoes(mergedShoes);
                  })
                  .catch((error) => {
                  })
                setCountServer(countServer + 1)
                setLoading(false); // 로딩 상태를 해제함
              }
              if (countServer === 2) {
                alert("No More Prodcts")
                setLoading(false); // 로딩 상태를 해제함
              }

            }}>
              {loading ? <img src="/img/loading_2.gif" width="50px" height="50px" style={{ border: "transparent" }} /> : "button"}
            </button>
          </Container>
        </div>} />

        <Route path="/detail/:id" element={
          <Context1.Provider value={{ stock, shoes }}>
            <Detail image={image} shoes={shoes} />
          </Context1.Provider>
        } />

        <Route path="/cart" element={
          <Cart/>
        }/>

        {/* nested routes */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>members</div>} />
          <Route path="location" element={<div>company location</div>} />
        </Route>

        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<p>Buy One Get One Free On Your First Order</p>} />
          <Route path="two" element={<p>30% Off Coupon On Your Birthday!</p>} />
        </Route>


        <Route path="/*" element={<div>Page Does Not Exist</div>} />
      </Routes>



      {/* 서버로 데이터 전송 POST 요청 예시*/}
      {/* axios.POST('/address', {name: "Nice"}) */}

    </div>
  );
}

function Product(props) {
  return (
    <div className='product'>
      <img src={props.image} width="80%" />
      <h4>{props.shoes.title}</h4>
      <h5>{props.shoes.content}</h5>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>Company Information</h4>
      <Outlet></Outlet>
    </div>
  )
}

function EventPage() {
  return (
    <div>
      <h4>Ongoing Events</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;



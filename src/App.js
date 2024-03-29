import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav, Row, Col, Modal, Card } from 'react-bootstrap';
import { createContext, useState, useEffect, lazy, Suspense, useTransition } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from 'react-query';
import Weather from './components/Weather';

// import Detail from './components/Detail';
// import Cart from './components/Cart';

//Context API 
export let Context1 = createContext()


// lazy 
const Detail = lazy(() => import('./components/Detail'))
const Cart = lazy(() => import('./components/Cart'))

function App() {

  // localStorage에서 watched 데이터 가져오기
    let storedWatched = JSON.parse(localStorage.getItem('watched'));

    useEffect(() => {
      if (storedWatched === null) {
        localStorage.setItem('watched', JSON.stringify([]));
      }
    }, []);
    


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

  // const sortProductsAlphabetically = () => {
  //   const sortedShoes = [...shoes].sort((a, b) => a.title.localeCompare(b.title));
  //   setShoes(sortedShoes);
  // }

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨')
      return a.data
    }),
    { staleTime : 2000 }
  )
  
  let [name, setName] = useState('')
  let [isPending, startTransition] = useTransition()

  let a = new Array(10000).fill(0)


  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  useEffect(()=> {
    if(count != 0 && count < 3){
      setAge(age + 1);
    }
  },[count])

  return (
    <div className="App">

      <div>
        <div>안녕하십니까 전 {age}</div>
        <button onClick={()=>{
          setCount(count + 1);
          }}>누르면한살먹기</button>
      </div>
      <Navbar bg="light" variant="light" className=''>
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav>
            <input onChange={(e)=>{
              startTransition(()=>{
                setName(e.target.value)
              })}}></input>
            {
              isPending ? 'Now Loading' :
              a.map(()=>{
                return <div>{name}</div>
              })
            }
          </Nav>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event/one') }}>Event</Nav.Link>
            {/* <Button variant="outline-primary" onClick={sortProductsAlphabetically}>Alphabetically Sort</Button>{' '} */}
          </Nav>
          {/* <Nav className='ms-auto'>
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav> */}
          <Nav>
              <Weather>
              </Weather>
          </Nav>
        </Container>
      </Navbar>


      {/* <Link to="/">Home</Link> <br></br>
      <Link to="/detail">Detail</Link>       */}

      <div className='main-bg'>
        <div className='watchedList'>
          <p>watched list</p>
            {storedWatched !== null
              ? storedWatched.map((a, index)=> {
                return (
    
                    <div key={index}>{storedWatched[index]} </div>
                  
                )
              }): null}
        </div>
      </div>


      <Suspense fallback={<div>Now Loading</div>}>
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
          <Outlet />
        </div>} />

          <Route path="/detail/:id" element={
            <Context1.Provider value={{ stock, shoes }}>
              <Detail image={image} shoes={shoes} />
            </Context1.Provider>
          } />

          <Route path="/cart" element={
            <Cart />
          } />

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
  </Suspense>

      {/* 서버로 데이터 전송 POST 요청 예시*/}
      {/* axios.POST('/address', {name: "Nice"}) */}

    </div>
  );
}

function Product(props) {

  const navigate = useNavigate();
  // 이미지 클릭 시 detail 페이지로 이동하는 함수
  const handleImageClick = () => {
    // 이미지 클릭 시 '/detail/:id' 경로로 이동
    navigate(`/detail/${props.shoes.id}`);
  }
  return (

    <div className='product'>
      <img src={props.image} width="80%" onClick={handleImageClick} /> {/* 이미지 클릭 이벤트 추가 */}
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



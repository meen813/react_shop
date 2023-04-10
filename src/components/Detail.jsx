import { useParams } from "react-router-dom";
import React from "react";

import { Form } from 'react-bootstrap';

import { useEffect , useState } from "react";

// // props로 컴포넌트 재활용
// let YellowBtn = styled.button`
//     background : ${props => props.bg};
//     color : ${props => props.bg == 'blue' ? 'white' : 'black'};
//     padding : 10px;
// `
// let Box = styled.div`
//     background : grey;
//     padding : 20px;
// `


const Detail = (props) => {



    let [count, setCount] = useState(0)
    let {id} = useParams();
    let foundProduct = props.shoes.find(function(x){
        return x.id == id
    });
    let [alert, setAlert] = useState(true)
    let [num, setNum] = useState('')
    let [warning, setWarning] = useState(false)


    useEffect(()=>{
        // mount, update시 여기 코드가 실행됨
        // useEffect 실행조건 넣을 수 있는 곳은 []
        let a = setTimeout(()=>{ setAlert(false)}, 2000)

        // timer cleanup
        return ()=>{
            clearTimeout(a)
        }
    }, [])

    useEffect(()=>{
        if(num && /\D/.test(num)){
            setWarning(true)
        } else {
            setWarning(false)
        }
    }, [num]) 

    return (
        <div className="container">

            {
                alert == true
                ?   <div className="alert alert-warning">
                        50% Discount If You Buy Under 2 secs
                    </div> 
                    : null
            }
            {/* <button onClick={()=>{setCount(count+1)}}>btn</button> */}

            <div className="row">
                <div className="col-md-6">
                    <img src={props.image[id]} width="100%" />
                </div>
                <div className="col-md-6">
                    {
                        warning == true
                        ?   <div className="alert alert-danger">
                                Must Be Numbers Only
                            </div>
                            : null
                    }
                    <input type="text" style={{borderColor: 'red'}} onChange={(e) => setNum(e.target.value)}/>
                    <h4 className="pt-5">{foundProduct.title}</h4>
                    <p>{foundProduct.content}</p>
                    <p>{foundProduct.price}</p>
                    <button className="btn btn-danger">Add to Cart</button>
                    {/* 
                    <Box>                    
                        <YellowBtn bg = "blue">Button</YellowBtn> 
                        <YellowBtn bg = "orange">Button</YellowBtn> 
                    </Box> */}
                </div>
            </div>
        </div>
    )
    // 

}


export default Detail;

// {props.shoes[id].title}은 props.shoes 배열에서 id 인덱스를 사용하여 직접 접근한 방식이고, {foundProduct.title}은 props.shoes 배열에서 find 메서드를 사용하여 찾은 foundProduct 객체의 title 속성을 접근한 방식입니다.

// {props.shoes[id].title}의 경우, id 인덱스를 사용하여 props.shoes 배열에서 해당 인덱스에 위치한 객체의 title 속성에 접근합니다. 이 방식은 배열의 인덱스에 직접 접근하기 때문에, props.shoes 배열이 변경되었을 때 해당 인덱스에 위치한 객체의 데이터를 가져오게 됩니다.

// 반면에 {foundProduct.title}은 find 메서드를 사용하여 props.shoes 배열에서 id와 일치하는 객체를 찾은 후, 해당 객체의 title 속성에 접근합니다. 이 방식은 find 메서드를 사용하여 원본 데이터를 검색하므로, props.shoes 배열이 변경되어도 foundProduct 변수에 저장된 객체는 변경되지 않습니다. 따라서 foundProduct.title을 사용할 때는 원본 데이터를 계속 참조하게 됩니다.

// 결과적으로, props.shoes[id].title은 항상 props.shoes 배열의 id 인덱스에 위치한 객체의 title 속성을 가져오지만, foundProduct.title은 find 메서드를 사용하여 검색한 원본 객체의 title 속성을 가져오게 됩니다.
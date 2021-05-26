import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {API_URL} from '../config/constants.js';
import dayjs from "dayjs";
import {Button, message} from 'antd';

function ProductPage() {
    // const params = useParams();
    // console.log(params);
    // return <h1>상품 상세 페이지</h1>
    const {id} = useParams();
    const [product, setProduct] = useState(null);  // product 처음에는 null이 들어간다

    const getProduct = () => {
        axios  
        .get(`${API_URL}/products/${id}`)
        // .get(`http://localhost:8080/products/${id}`)
        .then(function(result) {
            setProduct(result.data.product);
            console.log(result);
        })
        .catch(function(error) {
            console.error(error);
        });
    }

    const onClickPurchase = () => {
        axios.post(`${API_URL}/purchase/${id}`)
        .then((result) => {
            message.info('구매가 완료되었습니다.');
            getProduct();
        }).catch((error) => {
            message.error(`에러가 발생했습니다. ${error.message}`)
        })
    }

    useEffect(function() {
        getProduct();
    }, []);   // 한번만 호출될 수 있게 사용 []
    // console.log(product);

    // 방어코드 처음에는 null 이기 때문에 
    if(product === null) {
        return <h1>상품 정보를 받고 있습니다....</h1>
    }

    return (
        <div>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" /> 
                <span>{product.sller}</span>  
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">
                {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
                </div>
                <Button id="purchase-button" size="large" type="primary" danger onClick={onClickPurchase} disabled={product.soldout === 1}>
                    재빨리 구매하기
                </Button>
                <pre id="description">{product.description} </pre>
            </div>
        </div>
    );
}

export default ProductPage;
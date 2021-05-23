import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductPage() {
    // const params = useParams();
    // console.log(params);
    // return <h1>상품 상세 페이지</h1>
    const {id} = useParams();
    const [product, setProduct] = useState(null);  // product 처음에는 null이 들어간다

    useEffect(function() {
        axios  
        .get(
            "https://aeef9dfb-0ce1-47be-9a8d-aa7889bae32a.mock.pstmn.io/products/${id}"
        )
        .then(function(result) {
            setProduct(result.data);
            // console.log(result);
        })
        .catch(function(error) {
            console.error(error);
        });
    }, []);   // 1번만 호출될 수 있게 사용 []
    // console.log(product);

    // 방어코드 처음에는 null 이기 때문에 
    if(product === null) {
        return <h1>상품 정보를 받고 있습니다....</h1>
    }

    return (
        <div>
            <div id="image-box">
                <img src={"/"+product.imageUrl} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" /> 
                <span>{product.sller}</span>  
            </div>
            <div id="name">{product.name}</div>
            <div id="price">{product.price}원</div>
            <div id="createdAt">2020년 12월 8일</div>
            <div id="description">{product.description}</div>
        </div>
    )
}

export default ProductPage;
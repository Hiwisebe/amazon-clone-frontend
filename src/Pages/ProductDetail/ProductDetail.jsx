import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";


function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading,setisLoading]=useState(false)
  // console.log(productId)
  useEffect(() => {
    setisLoading(true)
    axios.get(`${producturl}/products/${productId}`).then((res) => {
      setProduct(res.data);
      setisLoading(false)
      // console.log(res.data);
    }).catch((err)=>{
     console.log(err)
     setisLoading(false)
    })
  }, []);
  // console.log(product)
  return (
    <Layout>
      {isLoading?(<Loader/>):(
    <ProductCard  itemPart={product}
    flex={true}
    renderDesc={true}
    renderAdd={true}
    />)}
    </Layout>
  );
}

export default ProductDetail;

import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
function Results() {
  const [results, setResults] = useState([]);
  const [isLoading,setisLoading]=useState(false)
  const { categoryName } = useParams();
  console.log(categoryName)
  useEffect(() => {
    setisLoading(true)
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        //  console.log(res)
        setResults(res.data);
        setisLoading(false)
        //  console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
          setisLoading(false);
      });
  }, []);
  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading?(<Loader/>):
       ( <div className={classes.products_wrapper}>
          {results?.map((product,index) => (
            <ProductCard key={index} itemPart={product} renderDesc={false} renderAdd={true}/>
          ))}
        </div>
)}
      </section>
    </Layout>
  );
}

export default Results;

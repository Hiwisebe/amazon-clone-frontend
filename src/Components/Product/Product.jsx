import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  const [items, setItems] = useState([]);
  const[isLoading,setisLoading]=useState(false)
  useEffect(() => {
    setisLoading(true)
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res)
        setItems(res.data);
        setisLoading(false)
        // console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false)
      });
  }, []);
  // console.log(items)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_wrapper}>
          {items.map((singleItem) => {
            return <ProductCard key={singleItem.id} itemPart={singleItem} renderAdd={true}/>;
          })}
        </section>
      )}
    </>
  );
 
}

export default Product;

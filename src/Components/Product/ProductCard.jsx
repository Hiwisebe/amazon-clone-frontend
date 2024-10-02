import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {DataContext} from "../DataProvider/DataProvider"
import { Type } from "../../Utility/action.type";



function ProductCard({ itemPart, flex,renderDesc,renderAdd }) {
  // console.log("itemPart:", itemPart);
  const { image, title, id, rating, price,description } = itemPart;
   
  const [state,dispatch]=useContext(DataContext)

 const addToCart=()=>{
  dispatch({
    type: Type.ADD_TO_BASKET,
    item: {
      image,
      title,
      id,
      rating,
      price,
      description,
    },
  });
 }



  //  const image = itemPart?.image;
  //  const title = itemPart?.title;
  //  const id = itemPart?.id;
  //  const rating = itemPart?.rating;
  //  const price = itemPart?.price;
  // console.log(itemPart.image)
  return (
    <div
      className={`${classes.card_wrapper} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "650px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating & price */}
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div className={classes.price}>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

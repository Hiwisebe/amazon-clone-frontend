import React from "react";
import classes from "./Category.module.css"
import {Link} from 'react-router-dom'
function CategoryCard({information}) {
  // console.log(information)
  // console.log(information.title)
  //   console.log(information.imgLink);
  return (
    <div className={classes.category}>
      <Link to={`/category/${information.name}`}>
        <span>
          <h2>{information?.title}</h2>
        </span>
        <img src={information?.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
 
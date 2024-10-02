import React from 'react'
import { amazonInfos } from './categoryFullinfo'
import CategoryCard from './CategoryCard'
import classes from "./Category.module.css"

function Category() {
  return (
   <section className={classes.Category_wrapper}>
    {
       amazonInfos.map((datas,index)=>(
        <CategoryCard key={index} information= {datas}/>
       ))
    }
   </section>
  )
}

export default Category

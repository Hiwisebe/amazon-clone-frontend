import React from "react";
import classes from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"
function Header() {
  const [{user, basket }, dispatch] = useContext(DataContext);
  // console.log(basket);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_wrapper}>
          {/* leaft header part ///amazon logo///*/}
          <div className={classes.logo_wrapper}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            {/* middle header part ///search/// */}
            <select name="" id="">
              <option value="All">All</option>
            </select>
            <input type="text" />
            <FaSearch size={38} />
          </div>

          <div className={classes.order_wrapper}>
            {/* right header part */}

            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/1920px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            {/* three components in the right most side */}

            <Link to={!user && "/auth"} className={classes.sign}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello,Sign In</p>
                    <span>Account & Lists </span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <FiShoppingCart size={25} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;

import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { GiSmallFire } from "react-icons/gi";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setcardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e?.error?.message ? setcardError(e?.error?.message) : setcardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // backend----contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      //  react side confirmation

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);

      // after confirmation---order firestore database save then clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // empty basket
       dispatch({type:Type.EMPTY_BASKET});
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header part */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* payment method part */}
      <section className={classes.payment}>
        {/* address part */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Ethiopia,Addis Abeba</div>
          </div>
        </div>
        <hr />
        {/* product part */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard itemPart={item} key={index} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* payment card part */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_wrapper}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error part */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card part */}
                <CardElement onChange={handleChange} />

                {/* price part */}

                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;

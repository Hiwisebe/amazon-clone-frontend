import React from "react";
import numerial from "numeral"

const CurrencyFormat=({amount})=>{
    const formattedAmount=numerial(amount).format("$0,0.00")
    return <div>{formattedAmount}</div>
}

export default CurrencyFormat
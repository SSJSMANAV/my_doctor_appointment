import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButton() {
  const initialOptions = {
    "client-id": "test",
    currency: "USD",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;

import React from "react";
import PayPalButton from "./paypal_button";

const CheckoutForm = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md shadow-orange-400 text-center w-1/3">
        
        <h2 className="text-lg text-purple-950 font-semibold mb-6 text-start ">
          Proceed To CheckOut
        </h2>
        <form>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="amount"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="border border-gray-300 rounded w-full py-2 px-3 text-orange-400 text-md font-semibold"
              value="$ 40"
              disabled
            />
          </div>

          <PayPalButton />
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;

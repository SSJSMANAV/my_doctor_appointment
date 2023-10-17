import React from "react";

const CheckoutForm = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-1/3">
        <h2 className="text-2xl font-semibold mb-6 text-start">Checkout</h2>
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
              className="border border-gray-300 rounded w-full py-2 px-3"
              value="$ 40"
              disabled
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="Your email"
            />
          </div>
          <div className="mb-6 flex flex-col items-start">
            <label
              htmlFor="pin"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              PIN
            </label>
            <input
              type="password"
              id="pin"
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="Enter your PIN"
            />
          </div>
          <button
            type="button"
            className="bg-white  w-full text-blue-950 border border-solid border-blue-950 hover:bg-blue-950 hover:text-white py-2 px-4 rounded-sm font-semibold"
          >
            Pay with PayPal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;

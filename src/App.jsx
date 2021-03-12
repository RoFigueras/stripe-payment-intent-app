import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./App.css";
import hotdog from "./hotdogPins.png";



const promise = loadStripe("pk_test_51ILz8BF4vqAzC1D3CZcMBwuEvQ2UIW87RD4ExFljAUwvgpPbroVt4Uqaa8sOL1Vibb4jf0b7MVfSdImkrC4MJk9800WDHZEOof");

export default function App() {
  return (
    <div className="App">
      <div>
        <div className="hotdog-div">
            <h1> Welcome to the secret Hotdog Pin Site </h1>
            <h3> Listen, the deal is simple. You want a hotdog pin... we have them.</h3>
            <h4>You give us $12.00, we send you a random hotdog pin.</h4>
        </div>
        <div>
          <img src={hotdog} className="hotdog-pin-logo" alt="hotdog pin"/>
        </div>
      </div>
      <div className="card-div">
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
      <div className="footer-div">
        <p>Made with ❤️ in MX.</p>
      </div>
    </div>
    
  );
}


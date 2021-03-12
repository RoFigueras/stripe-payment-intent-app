const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');

// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51ILz8BF4vqAzC1D36kATajGMss1YntBIwZEIs4ViAldqM8st5NDhSJvsiXG9V0wgmTURYn1KCFjyHFEsltTY9Tqg002tTM39lZ");

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static("."));
app.use(express.json());


const calculateOrderAmount = items => {
  return 1200;
};

app.post("/create-payment-intent", bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    payment_method_types: ['card'],
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
  
});

// Add Webhook to receive orders from Stripe documentation.

app.post('/webhook', (request, response) => {
  const event = request.body;
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      fs.appendFile('./src/orders.txt', `\nNew order received! Charge ID: ${paymentIntent.charges.data[0].id}, total amount: $${(paymentIntent.charges.data[0].amount)/100}.`, (err) => {
        if (err) {
          console.log(err);
        };
      });
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      console.log(`New event of type ${paymentMethod.type}, with ID: ${paymentMethod.id}.`);
      break;
      case 'payment_intent.created':
        const paymentIntentCreated = event;
        console.log(`New event of type ${paymentIntentCreated.type}, with ID: ${paymentIntentCreated.id}.`);
        break;
      case 'charge.succeeded':
        const chargeSucceeded = event;
        console.log(`New event of type ${chargeSucceeded.type}, with ID: ${chargeSucceeded.id}.`);
        break;
      case 'payment_intent.requires_action':
        const paymentIntentRequiresAction = event;
        console.log(`New event of type ${paymentIntentRequiresAction.type}, with ID: ${paymentIntentRequiresAction.id}.`);
        break;
      case 'charge.failed':
        const chargeFailed = event;
        console.log(`New event of type ${chargeFailed.type}, with ID: ${chargeFailed.id}.`);
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event;
        console.log(`New event of type ${paymentIntentPaymentFailed.type}, with ID: ${paymentIntentPaymentFailed.id}.`);
        break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.status(200).send("Event received!");
});



app.listen(4242, () => console.log('Node server listening on port 4242!'));
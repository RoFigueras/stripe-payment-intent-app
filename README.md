# PaymentIntent Integration by Rodrigo Figueras

The same information can also be found in the PDF file included in the Dropbox download.

## Setting up the application

1 Download the whole folder titled `Stripe PaymentIntentApp - Rodrigo Figueras` from the Dropbox link. This link will also include the Friction Log file as well as a PDF version of the README file. Unzip the file called `payment-intents-app`.

2 Open VSCode or your preferred code editor.

3 Open the `payment-intents-app` file within your preferred code editor. For VSCode simply drag and drop the folder into the editor window.

4 The project is based on NodeJS, if you don’t have it installed you can do so here: https://nodejs.org/en/download/

5 To start the project open your terminal, navigate to the file location and run the command `npm start`. If you’re using VSCode you can open the included terminal and run the same command.

6 Your browser should be automatically redirected. If not, navigate to localhost:3000 to access the application.

7 Once in the application you should be able to successfully test the integration using the test cards provided by Stripe in the “Test Your Integration” section of this page: https://stripe.com/docs/payments/accept-a-payment?ui=elements

8 All successful payments should automatically be logged in the orders.txt file included in the project inside the src folder.

## Simulating payments with Stripe CLI

9 To simulate payments you will need the Stripe CLI. You can download it by opening your terminal and running the command `brew install stripe/stripe-cli/stripe`. If you don’t have Homebrew installed, you can download the CLI directly from https://github.com/stripe/stripe-cli/releases/tag/v1.5.10 by selecting your operating system. More information can also be found here: https://stripe.com/docs/stripe-cli.

10 Once installed, you can login to your Stripe account from the CLI using the command `stripe login` and following the instructions.

11 Once logged in, you can set up a webhook by using the command `stripe listen --forward-to localhost:4242/webhook` . You should receive a confirmation message.

12 To simulate payments, open a new terminal window and run the command `stripe trigger payment_intent.succeed` . 

13 You should now be able to test manually using the website accessible in your browser at localhost:3000 as well as via the CLI using the previous command.

14 All payments should be successfully logged in the orders.txt file.

Enjoy :)


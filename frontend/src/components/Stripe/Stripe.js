import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LQyMDKrhyc13hMnHkZoiJaXAyIj50XvYJVbI1z6Tg6vWKy5RbOj5E3hA5yjpbeiCneuOOW1CS85HT43a81HRC2d002LSxbi9n"
);

function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

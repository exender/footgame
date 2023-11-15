import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const payment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1OCg4PCsdORDHu1pBOUjh1lB',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: "http://localhost:8000/api/success?sessionId={CHECKOUT_SESSION_ID}", 
    cancel_url: "http://localhost:8000/cancel", 
  });
  res.json({ id: session.url }); 
}; 

export const successPayment = async (req, res) => {
  let key = ''
  if (req.query.sessionId) {
    key = process.env.API_KEY
  };
  console.log('api_key', key)
  res.json({ api_key: key }); 
}; 

export const paymentLink = async (req, res) => {

  res.json({ link_to_pay: 'https://buy.stripe.com/test_5kA7ve11X4q59DW4gh' }); 
}; 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

export const payment = async (req, res) => {

  res.json({ link_to_pay: 'https://buy.stripe.com/test_5kA7ve11X4q59DW4gh' }); 
}; 
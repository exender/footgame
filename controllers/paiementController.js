// paiementController.js
const stripe = require('./config');

const creerPaiement = async (req, res) => {
    const { montant, description, source } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: montant,
            currency: 'eur', // ou une autre devise
            description: description,
            payment_method: source,
            confirmation_method: 'card',
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la création du paiement');
    }
};

module.exports = { creerPaiement };



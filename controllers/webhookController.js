// webhookController.js
const stripe = require('./config');

const gestionWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, 'votre_clé_endpoint_webhook');
    } catch (err) {
        console.error(err);
        return res.status(400).send(`Erreur de webhook : ${err.message}`);
    }

    // Gérez l'événement
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Gérez le paiement réussi
            console.log('Paiement réussi :', paymentIntent.id);
            break;
        // Ajoutez d'autres cas pour gérer différents types d'événements

        default:
            console.log(`Événement non géré : ${event.type}`);
    }

    res.status(200).end();
};

module.exports = { gestionWebhook };

const Stripe = require('stripe')

let stripe = null

const getStripeClient = () => {
    if (stripe) return stripe

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
        return null
    }

    stripe = Stripe(secretKey)
    return stripe
}

module.exports = getStripeClient

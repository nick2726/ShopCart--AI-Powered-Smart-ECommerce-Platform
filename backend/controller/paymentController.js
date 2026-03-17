const getStripeClient = require('../config/stripe')

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return response.status(400).json({
                message: 'Cart items are required to create a payment session.',
                error: true,
                success: false,
            })
        }

        const stripe = getStripeClient()
        if (!stripe) {
            return response.status(500).json({
                message: 'Stripe payment is not configured on the server.',
                error: true,
                success: false,
            })
        }

        const shippingRate = process.env.STRIPE_SHIPPING_RATE

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.productName,
                        images: item.productId.productImage,
                        metadata: {
                            productId: item.productId._id,
                        },
                    },
                    unit_amount: item.productId.sellingPrice * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: item.quantity,
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        if (shippingRate) {
            params.shipping_options = [{ shipping_rate: shippingRate }]
        }

        const session = await stripe.checkout.sessions.create(params)
        return response.status(303).json(session)
    } catch (error) {
        return response.status(500).json({
            message: error?.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = paymentController

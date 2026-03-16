const stripe = require('../config/stripe') // We will create this config next

const paymentController = async(request, response) => {
    try {
        const { cartItems } = request.body
        
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1Oxxxxxxxxx' } // You can create this in Stripe dashboard or leave empty
            ],
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100 // Stripe works in paise
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params);
        response.status(303).json(session)

    } catch (error) {
        response.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = paymentController
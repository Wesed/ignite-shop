import Stripe from 'stripe'

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2023-08-16',
// })

export const stripe = new Stripe(
  'sk_test_51NuMDxLnYtpWouRFnF9gaKPP5AYN0MIHigpf3u6kMpl9gJetmzFfhy1Il2nUhJLYc4dTMYcGTrwiV7Pj9qkEVAvS009ypMSNOR',
  {
    apiVersion: '2023-08-16',
  },
)

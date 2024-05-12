Algorithm

1. Generate a purchase_order_id
2. Payment request is made in khalti providing purchase_order_id, amount in paisa and return_url
3. Add Authorization token --> "Key Token" in http header
4. Initialize the payment request in api endpoint i.e https://a.khalti.com/api/v2/ with a server side post request in the route "/epayment/initiate/" which return the pidx.

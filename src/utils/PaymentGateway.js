import axios from "axios";

export default async function displayRazorPay(total, user, selectedPatients, plan) {
    try {
        const response = await fetch("http://localhost:8000/razorpay", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: total })
        });
        const data = await response.json();
        console.log(data);
        const actionSubmit = async (r) => {
            const today = new Date();
            const expiry = new Date();
            expiry.setFullYear(today.getFullYear() + 1);

            try {
                const response = await axios.post("http://localhost:8000/api/patient-plans", {
                    user_id: user._id,
                    plan_id: plan._id,
                    selectedPatients,
                    Purchased_On: today,
                    Expiry_Date: expiry,
                    order_id: r.razorpay_order_id,
                    payment_id: r.razorpay_payment_id
                });
                console.log(response.data);
            } catch (error) {
                console.error("Error in actionSubmit:", error);
            }
        };


        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            currency: data.currency,
            amount: data.amount,
            description: "Health Insurance",
            image: "http://localhost:8000/logo.jpg",
            order_id: data.id,
            handler: function (response) {
                actionSubmit(response);
               
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phoneNumber,
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error("Error in displayRazorPay:", error);
    }
}

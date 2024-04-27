import toast from "react-hot-toast";
import {studentEndpoints} from "../apis"
import { apiConnector } from "../apiconnector";
import { useSelector } from "react-redux";
import learnhub from "../../assets/Logo/learnhublogo.png"
import { setPaymentLoading } from "../../reducers/Slices/courseSlice";
import { resetCart } from "../../reducers/Slices/cartSlice";
const{COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

function loadScript (src) {
    return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src=src;
    script.onload = () => {
    resolve(true);
    }
    script.onerror= () =>{
    resolve(false);
    }
    document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses,userDetails, navigate, dispatch ){
    const toastId=toast.loading("Loading.....");
    try{
        let res=loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load")
            return;
        }
        // initiate the order
        const orderResponse=await apiConnector("POST" ,COURSE_PAYMENT_API,
        {courses},{Authorization:`Bearer ${token}`})

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        console.log("printing order response:", orderResponse);
        // create options
        var options = {
            "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            "amount": `${orderResponse.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": orderResponse.data.data.currency,
            "name": "Learn Hub", //your business name
            "description": "Thank You for purchasing",
            "image": {learnhub},
            "order_id": orderResponse.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": `${userDetails.name}`, //your customer's name
                "email": `${userDetails.email}`,
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch)
                }
            
        };
        const paymentObject = new window.Razorpay (options);
        paymentObject.open();
        paymentObject.on("payment. failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    }
    catch(e){
        console.log(e);
        toast.error(e.message)
    }
    toast.dismiss(toastId)

}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {orderId:response.razorpay_order_id, paymentId:response.razorpay_payment_id, amount },{Authorization:`Bearer ${token}`})
    }
    catch(e){
        console.log("PAYMENT SUCCESS EMAIL ERROR..", e);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId=toast.loading("Verifying Payment......")
    dispatch(setPaymentLoading(true))
    try{

        const res=await apiConnector("POST", COURSE_VERIFY_API,bodyData,{Authorization:`Bearer ${token}`})

        if(!res.data.success){
            throw new Error(res.data.message)
        }

        toast.success("payment Successful")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    }
    catch(e){
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false));
}
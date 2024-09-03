import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import avatar2 from '../assets/avatar-2.avif'
import FormImage2 from "../assets/salon-img-form3.jpeg";
import './bookingForm.css'

const BookingForm = () => {
    const [price, setPrice] = useState(99);
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        formTime: "",
        service: "Hair Cut",
        price: 99
    });
    const [allService, setAllService] = useState([
        {
            serviceName: 'Classic Hair Cut',
            price: 99
        }
    ]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const timeSlots = [
        '11:00 AM', '12:00 PM', '01:00 PM', '01:45 PM',
        '02:30 PM', '04:00 PM', '05:00 PM', '07:00 PM',
    ];

    const handleOnChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        setFormData({ ...formData, formTime: time });
    }

    const handleOptions = async (e) => {
        let currVal = e.target.value;

        try {
            let servicedata = await axios.get('/api/service-data');
            if (servicedata.data) {
                setAllService(servicedata.data);
                servicedata.data.map((item) => {
                    if (currVal == item.serviceName) {
                        setPrice(item.price);
                        setFormData({ ...formData, price: item.price, service: currVal });
                    }
                })
            }
        } catch (error) {
            console.error("An Error Occurred:", error)
        }
    }

    const onSubmit = async () => {
        try {
            console.log(formData.date)
            const orderResponce = await axios.post('/api/checkout', formData);
            if (orderResponce.data) {
                let order = orderResponce.data;
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_API_KEY,
                    amount: order.amount.toString(),
                    currency: "INR",
                    name: "Enrich Hair Salon",
                    description: formData.service,
                    image: avatar2,
                    order_id: order.id,
                    callback_url: "/api/paymentverification",
                    prefill: {
                        name: formData.name,
                        email: formData.email,
                        contact: formData.phone
                    },
                    notes: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        service: formData.service,
                        date: formData.date,
                        time: formData.formTime,
                        price: formData.price
                    },
                    theme: {
                        "color": "#121212"
                    }
                };

                const razor = new window.Razorpay(options);
                razor.open();
            }
        } catch (error) {
            console.error("An Error Occurred while payment", error);
        }
    }

    return (
        <div className="flex max-lg:justify-center overflow-hidden">
            <div className="bg-emerald-600 w-[45%] max-sm:hidden max-lg:hidden flex justify-center items-center h-screen">
                <img src={FormImage2} alt="" className="w-[100%]" />
            </div>
            <section className="text-black max-sm:h-[125vh] max-sm:ml-0 max-lg:ml-0 ml-32 max-[1300px]:ml-24">
                <div className="flex flex-col items-center justify-center max-sm:px-[5px] px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                    <div className="w-full lg:max-w-lg bg-black rounded-3xl shadow-gray-400 shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Book Your Seat
                            </h1>
                            <form className="text-black" onSubmit={handleSubmit(onSubmit)}>

                                <div className="flex max-lg:flex-row max-sm:flex-col w-full">
                                    {/* name */}
                                    <div className="mb-2 w-full">
                                        <label htmlFor="name" className="block mb-2 text-[12px] font-medium text-white">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="font-['Cambria'] w-full bg-black border border-gray-300 text-white text-sm rounded-lg block p-2.5 placeholder:text-white"
                                            placeholder="Enter your name"

                                            {...register("name")}
                                            onChange={handleOnChange} />
                                    </div>

                                    {/* email */}
                                    <div className="max-xl:ms-2 max-lg:ms-2 max-sm:ms-0 mb-2 w-full ml-[10px]">
                                        <label htmlFor="email" className="block mb-2 text-[12px] font-medium text-white">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="font-['Cambria'] w-full bg-black border border-gray-300 text-white text-sm rounded-lg block p-2.5 placeholder:text-white"
                                            placeholder="Enter your email"
                                            {...register('email', {
                                                // required: true,
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Please enter a valid email',
                                                },
                                            })}
                                            onChange={handleOnChange} />
                                        {errors.email && (
                                            <div className="text-red-500">Enter a valid email</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex max-lg:flex-row max-sm:flex-col w-full mb-2">
                                    {/* phone */}
                                    <div className="mb-2 w-full">
                                        <label htmlFor="phone" className="block mb-2 text-[12px] font-medium text-white">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            placeholder="Phone number"
                                            className="font-['Cambria'] w-full bg-black border border-gray-300 text-white text-sm rounded-lg block p-2.5 placeholder:text-white"
                                            {...register("phone", { minLength: 10, maxLength: 10 })} onChange={handleOnChange} />
                                        {errors.phone && (
                                            <div className="text-red-500">Phone number should be valid!</div>
                                        )}
                                    </div>

                                    {/* date */}
                                    <div className="max-xl:ms-2 max-lg:ms-2 max-sm:ms-0 w-full ml-[10px]">
                                        <div className="flex-1 w-full mr-3">
                                            <label htmlFor="date" className="block mb-2 text-[12px] font-medium text-white">
                                                Choose your date
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                placeholder="choose a date"
                                                className="font-['Cambria'] w-full bg-black border border-gray-300 text-white text-sm rounded-lg block p-2.5 placeholder:text-white"
                                                {...register("date")}
                                                onChange={handleOnChange}

                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Time */}
                                <div className="mb-2 w-full">
                                    <label htmlFor="time" className="block mb-2 text-[12px] font-medium text-white">
                                        Choose a time slot
                                    </label>
                                    <div className="time-slots w-full">
                                        {timeSlots.map((time, index) => (
                                            <label key={index} className={`font-['Cambria'] time-slot ${selectedTime === time ? 'selected' : ''} text-[14px] max-sm:text-[13px] tran-time`}>
                                                <input
                                                    type="radio"
                                                    name="time"
                                                    className="timeInput w-full"
                                                    value={time}
                                                    checked={selectedTime === time}
                                                    {...register("formTime")}
                                                    onChange={() => handleTimeChange(time)}
                                                />
                                                {time}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Service */}
                                <div className="mb-2">
                                    <label htmlFor="service" className="block mb-2 text-[12px] font-medium text-white">Choose your service</label>
                                    <select
                                        id="service"
                                        name="service"
                                        className="font-['Cambria'] w-full bg-black form-select border border-gray-300 text-sm rounded-lg block p-2.5 text-white placeholder:text-white appearance-none"
                                        {...register("service")}
                                        onClick={handleOptions}
                                        placeholder="click here to choose service">
                                        {
                                            allService.map((item, idx) => (
                                                <option key={idx} value={item.serviceName}>{item.serviceName}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* price */}
                                <div className="mb-2">
                                    <label htmlFor="price" className="block mb-2 text-[12px] font-medium text-white">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={price}
                                        className="font-['Cambria'] w-full bg-black border border-gray-300 text-sm rounded-lg block p-2.5 text-white hover:cursor-not-allowed"
                                        disabled
                                        {...register("price")}
                                        onChange={handleOnChange} />
                                </div>

                                <div className="mt-4 w-full">
                                    <button className="btn bg-emerald-600 font-semibold text-white w-full pay-btn" type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Pay Now"}</button>
                                </div>
                                {errors.root && <div className="text-red-500">{errors.root.message}</div>}

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BookingForm;
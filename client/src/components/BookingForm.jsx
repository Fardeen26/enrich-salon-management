import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import './bookingForm.css'
import avatar2 from '../assets/avatar-2.avif'

const BookingForm = () => {
    const [price, setPrice] = useState(100);
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        formTime: "",
        service: "Hair Cut",
        price: 100
    });

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
        let servicedata = await axios.get(import.meta.env.VITE_APP_API_DATA_URL);
        if (servicedata) {
            servicedata.data.map((item) => {
                if (currVal == item.serviceName) {
                    setPrice(item.price);
                    setFormData({ ...formData, price: item.price, service: currVal });
                }
            })
        } else {
            console.log("error occured");
        }
    }


    const onSubmit = async (data) => {
        console.log(formData);
        const orderResponce = await axios.post('https://b96a-103-170-68-147.ngrok-free.app/checkout', formData);
        if (orderResponce) {
            let order = orderResponce.data;
            const options = {
                key: import.meta.env.RAZORPAY_API_KEY,
                amount: order.amount.toString(),
                currency: "INR",
                name: "Enrich Hair Salon",
                description: formData.service,
                image: avatar2,
                order_id: order.id,
                callback_url: "https://b96a-103-170-68-147.ngrok-free.app/paymentverification",
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
    };

    return (
        <section className="bg-black dark:bg-black text-black max-sm:h-[120vh]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full lg:max-w-lg bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <h1 className="text-xl font-bold leading-tight tracking-tigh md:text-2xl dark:text-white text-black">
                            Book Your Seat
                        </h1>
                        <form className="text-black" onSubmit={handleSubmit(onSubmit)}>

                            <div className="flex max-lg:flex-row max-sm:flex-col w-full">

                                {/* name */}

                                <div className="mb-2 w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-white text-black">Name</label>
                                    <input type="text" name="name" id="name" className="w-full bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:placeholder-white" placeholder="Enter your name" required="" {...register("name")} onChange={handleOnChange} />
                                </div>

                                {/* email */}

                                <div className="mb-2 w-full margin-left">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-white text-black">Email</label>
                                    <input type="text" name="email" id="email" className="w-full bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email"  {...register('email', {
                                        required: true,
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        },
                                    })} onChange={handleOnChange} />

                                    {errors.email && (
                                        <div className="text-red-500">Enter a valid email</div>
                                    )}
                                </div>
                            </div>



                            <div className="flex max-lg:flex-row max-sm:flex-col w-full mb-2">

                                {/* phone */}

                                <div className="mb-2 w-full">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium dark:text-white text-black">Phone Number</label>
                                    <input type="tel" name="phone" id="phone" placeholder="Phone number" className="w-full bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("phone", { required: true, minLength: 10, maxLength: 10 })} onChange={handleOnChange} />
                                    {errors.phone && (
                                        <div className="text-red-500">Phone number should be valid!</div>
                                    )}
                                </div>

                                {/* date */}

                                <div className="max-xl:ms-2 max-lg:ms-2 max-sm:ms-0 w-full margin-left">

                                    <div className="flex-1 w-full mr-3">
                                        <label htmlFor="date" className="block mb-2 text-sm font-medium dark:text-white text-black">
                                            Choose your date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            placeholder="choose a date"
                                            className="w-full bg-black text-white border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            {...register("date")}
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Time */}

                            <div className="mb-2 w-full">
                                <label htmlFor="time" className="block mb-2 text-sm font-medium dark:text-white text-black">
                                    Choose a time slot
                                </label>
                                <div className="time-slots w-full">
                                    {timeSlots.map((time, index) => (
                                        <label key={index} className={`time-slot ${selectedTime === time ? 'selected' : ''} text-sm max-sm:text-xs tran-time`}>
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
                                <label htmlFor="service" className="block mb-2 text-sm font-medium dark:text-white text-black">Choose your service</label>
                                <select className="w-full bg-black form-select border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="service" name="service" {...register("service")} onClick={handleOptions}>
                                    <option value="Classic Hair Cut">Hair Cut</option>
                                    <option value="Beard Styling">Beard</option>
                                    <option value="Hair Color">Hair Color</option>
                                    <option value="Ceretine">Ceretine</option>
                                    <option value="Massage">Massage</option>
                                    <option value="Make-Up">Make-Up</option>
                                </select>
                            </div>
                            
                            {/* price */}

                            <div className="mb-2">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium dark:text-white text-black">Price</label>
                                <input type="number" name="price" id="price" value={price} className="w-full bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled  {...register("price")} onChange={handleOnChange} />
                            </div>

                            <div className="mt-4 w-full">
                                <button className="btn bg-green-500 font-semibold text-black border w-full tran-time" type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Pay Now"}</button>
                            </div>
                            {errors.root && <div className="text-red-500">{errors.root.message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookingForm;


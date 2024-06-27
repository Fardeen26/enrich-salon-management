import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

const BookingForm = () => {
  const [price, setPrice] = useState(100);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "Hair Cut",
    price: 100
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const handleOnChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    let responce = await axios.post(import.meta.env.VITE_APP_API_PAYMENT_URL, formData);
    if (responce) {
      window.location.href = responce.data.url;
    } else {
      console.log("issue aayegi 17 ko nhi aayi bas 18 ko aa jaye!");
    }
  };


  return (
    <section className="bg-black dark:bg-black text-black max-sm:h-[100vh]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-black">
              Book Your Seat
            </h1>
            <form className="space-y-4 md:space-y-6 text-black" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-white text-black">Name</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" {...register("name")} onChange={handleOnChange} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-black">Email</label>
                <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  {...register('email', {
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
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-black">Phone Number</label>
                <input type="tel" name="phone" id="phone" placeholder="1234567890" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("phone", { required: true, minLength: 10, maxLength: 10 })} onChange={handleOnChange} />
                {errors.phone && (
                  <div className="text-red-500">Phone number should be valid!</div>
                )}
              </div>
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-black">Chose your date</label>
                <input type="datetime-local" name="date" id="date" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("date")} onChange={handleOnChange} />
              </div>


              <div className="mb-3">
                <label htmlFor="service" className="form-label">What do you want</label>
                <select className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="service" name="service" {...register("service")} onClick={handleOptions}>

                  <option value="Classic Hair Cut">Hair Cut</option>
                  <option value="Beard Styling">Beard</option>
                  <option value="Hair Color">Hair Color</option>
                  <option value="Ceretine">Ceretine</option>
                  <option value="Massage">Massage</option>
                  <option value="Make-Up">Make-Up</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-black">Price</label>
                <input type="number" name="price" id="price" value={price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled  {...register("price")} onChange={handleOnChange} />
              </div>

              <div className="">
                <button className="btn bg-gray-50 border text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Pay Now"}</button>
              </div>
              {errors.root && <div className="text-red-500">{errors.root.message}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
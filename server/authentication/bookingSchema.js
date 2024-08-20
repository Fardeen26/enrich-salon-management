const { z } = require('zod')

const bookingSchema = z.object({
    name: z
        .string({ required_error: "Name is required!" })
        .trim()
        .min(3, { message: "Name must be at least 3 character!" })
        .max(255, { message: "Name must not be more then 255 characters!" }),
    email: z
        .string({ required_error: "Email is required!" })
        .trim()
        .email({ message: "Invalid Email!" }),
    phone: z
        .string({ required_error: "Phone number is required!" })
        .min(10, { message: "Phone number must be at least 10 digit!" })
        .max(10, { message: "Phone number must not be more then 10 digit!" }),
    service: z
        .string({ required_error: "An Service is required!" }),
    date: z
        .string({ required_error: "Date is required!" }),
    formTime: z
        .string({ required_error: "Time is required!" }),
    price: z
        .number({ required_error: "Price is required!" }),
});

module.exports = bookingSchema;
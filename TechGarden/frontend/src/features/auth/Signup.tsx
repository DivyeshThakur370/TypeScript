import axios from "axios";
// import React, { useState } from "react";
import { signInresponse, signUpresponse } from "../../types/User";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const SignUp = () => {
    const schema = z.object({
        email: string().email("please fill the email").includes("@gmail.com"),
        password: string().min(6),
        conformPassword: string().min(6),
    })
    type userSchema = z.infer<typeof schema>
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<userSchema>({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate()

    const handleClick = async (data: userSchema) => {
        console.log(data)
        try {
            const res = await axios.post<signUpresponse>(
                `http://localhost:8080/user/signup`,
                data, {
                withCredentials: true
            }
            );
            if (res.data?.success) {
                toast.success(res.data?.message)
                setTimeout(() => {
                    navigate("/contact")
                }, 1500);
            }
            localStorage.setItem("id", JSON.stringify(res.data.data._id))
            if (res.data.data) {
                const SignInres = await axios.post<signInresponse>(`http://localhost:8080/user/signin`, { email: data.email, password: data.password }, {
                    withCredentials: true
                })
                if (SignInres.data.token) {
                    localStorage.setItem("token", JSON.stringify(SignInres.data.token))
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Signup error:", error.response?.data);
                if (error.response?.data && !error.response.data.success) {
                    toast.error(error.response.data.message);
                }
            } else {
                console.error("Unexpected error:", error);
                toast.error("Something went wrong!");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Sign Up
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit(handleClick)}>
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-600">{errors.email?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-600">{errors.password?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                            Confirm Password
                        </label>
                        <input
                            {...register("conformPassword")}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-600">{errors.conformPassword?.message}</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

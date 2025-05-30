import axios from "axios"
// import React, { useState } from "react"
import { signInresponse } from "../../types/User"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

export const SignIn = () => {
    const schema = z.object({
        email: z.string().email().includes("@gmail.com"),
        password: z.string().min(6),
    });
    type userSchema = z.infer<typeof schema>
    const {
        register,
        handleSubmit,
        formState: { errors }, } = useForm<userSchema>({
            resolver: zodResolver(schema),
        })
    const navigate = useNavigate()
    const handleSignin = async (data: userSchema) => {
        try {
            const res = await axios.post<signInresponse>(`http://localhost:8080/user/signin`, data, {
                withCredentials: true
            })
            if (res.data.success) {
                localStorage.setItem("token", JSON.stringify(res.data.token))
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate("/contact")
                }, 1500)
            } else {
                toast.error(res.data.message)
            }
            localStorage.setItem("id", JSON.stringify(res.data.data._id))
        } catch (err: unknown) {
            console.error(err)
        }
    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Sign In
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit(handleSignin)}>
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


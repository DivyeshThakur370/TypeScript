import axios from "axios";
import { useRef, useState } from "react";
import { resCreateContact } from "../types/Contact";
import { useNavigate } from "react-router-dom";
import dp from "../../public/dp.jpg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

// Zod schema definition
const schema = z.object({
    email: z.string().email("Invalid email"),
    name: z.string().min(1, "Name is required"),
    number: z.string().min(10, "Number must be at least 10 digits"),
});
type userSchema = z.infer<typeof schema>;

export const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<userSchema>({
        resolver: zodResolver(schema),
    });

    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);

    const removeImage = () => {
        setImage(null);
        setImageName(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCreate = async (data: userSchema) => {
        try {
            const formData = new FormData();
            if (image) {
                formData.append("image", image);
            }
            formData.append("email", data.email);
            formData.append("name", data.name);
            formData.append("number", data.number);

            const res = await axios.post<resCreateContact>(
                `http://localhost:8080/contact/create`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                reset();
                setImage(null);
                setImageName(null);
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/contact");
                }, 1500);
            }
        } catch (error) {
            console.error("Contact creation error:", error);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const isValidImage = files[0].type === "image/png" || files[0].type === "image/jpeg";

            if (isValidImage) {
                setImage(files[0]);
                setImageName(files[0].name);
            } else {
                toast.error("Only PNG or JPG images are allowed.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Create Contact
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit(handleCreate)}>
                    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                        <label className="block mb-1 font-medium text-gray-700">
                            Profile Image
                        </label>
                        <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md border border-gray-300">
                            <img
                                src={image ? URL.createObjectURL(image) : dp}
                                className="w-12 h-12 object-cover rounded-full border"
                                alt="Preview"
                            />
                            {/* Show input only if image is NOT selected */}
                            {!image && (
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    // accept="image/*"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setImage(e.target.files[0]);
                                            setImageName(e.target.files[0].name);
                                        }
                                    }}
                                    className="flex-1 text-sm text-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                            )}
                            {/* Show file name and remove option if image is selected */}
                            {imageName && (
                                <p className="text-sm text-gray-600 mt-1">
                                    Selected Image: {imageName}
                                </p>
                            )}
                            {image && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="text-red-500 hover:text-red-700 text-xl"
                                    title="Remove image"
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            {...register("email")}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <p className="text-red-500 text-sm">{errors.email?.message}</p>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            {...register("name")}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <p className="text-red-500 text-sm">{errors.name?.message}</p>
                    </div>

                    {/* Number Input */}
                    <div>
                        <label className="block mb-1 font-medium">Number</label>
                        <input
                            {...register("number")}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <p className="text-red-500 text-sm">{errors.number?.message}</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

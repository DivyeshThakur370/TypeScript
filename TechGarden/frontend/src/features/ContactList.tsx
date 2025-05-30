import axios from "axios"
import { useEffect, useState } from "react"
import { contactData, resContactData } from "../types/Contact"
import defaulImg from "../../public/dp.jpg"
import Swal from 'sweetalert2'
import toast, { Toaster } from "react-hot-toast"

export const ContactList = () => {
    const [view, setView] = useState<boolean>(false)
    const [data, setData] = useState<contactData[]>([])
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [image, setImage] = useState<File | string | null>(null)
    const [removeImage, setremoveImage] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [userid, setUserid] = useState<string | null>(null)
    const id: string | null = JSON.parse(localStorage.getItem("id") as string)

    const showData = async () => {
        try {
            const res = await axios.get<resContactData>(`http://localhost:8080/contact/all/${id}`, {
                withCredentials: true
            })
            setData(res.data?.data)
        } catch (error) {
            console.error("Error fetching contacts:", error)
        }
    }

    const handleDelete = async (deleteId: string | null) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                try {
                    if (!deleteId) return
                    await axios.delete(`http://localhost:8080/contact/delete/${deleteId}`)
                    showData()
                } catch (error) {
                    console.error(error)
                }
            }
        });

    }

    const handleUpdate = async (id: string | null) => {
        try {
            if (!id) return
            setShowUpdateForm(true)
            setUserid(id)
            const updatedData = await axios.get(`http://localhost:8080/contact/one/${id}`)
            setImage(updatedData.data?.data?.image)
            setEmail(updatedData.data?.data?.email)
            setName(updatedData.data?.data?.name)
            setNumber(updatedData.data?.data?.number)
        } catch (error) {
            console.error(error)
        }
    }

    const updateClicked = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            if (image instanceof File) {
                formData.append("image", image)
            }
            formData.append("removeImage", removeImage ? "true" : "false")
            formData.append("email", email)
            formData.append("name", name)
            formData.append("number", number)

            await axios.patch(`http://localhost:8080/contact/update/${userid}`, formData)
            setShowUpdateForm(false)
            showData()
        } catch (error) {
            console.error("Error updating contact:", error)
        }
    }
    const handleImageremove = () => {
        setImage(null)
        setremoveImage(true)
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const isValidImage = files[0].type === "image/png" || files[0].type === "image/jpeg";
            if (isValidImage) {
                setImage(files[0]);
            } else {
                toast.error("Only PNG or JPG images are allowed.");
            }
        }
    };
    useEffect(() => {
        showData()
    }, [])

    return (
        <div className="p-4">
            <Toaster position="top-center" reverseOrder={false} />
            {/* Toggle View Button */}
            <div className="mb-4 text-center">
                <button
                    onClick={() => setView(!view)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                    {view ? "Normal View" : "Table View"}
                </button>
            </div>

            {/* Table or Card View */}
            {view ? (
                <div className="overflow-x-auto rounded border border-gray-200">
                    <table className="w-full min-w-[600px] text-sm text-left text-gray-700 border-collapse">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-600 sticky top-0">
                            <tr>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Number</th>
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, idx) => (
                                <tr key={idx} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        <img
                                            src={user.image ? `http://localhost:8080/photos/${user.image}` : defaulImg}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2 truncate max-w-[100px]" title={user.name}>
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-2 truncate max-w-[150px]" title={user.email}>
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-2">{user.number}</td>
                                    <td className="px-4 py-2 truncate max-w-[120px]" title={user.userId}>
                                        {user.userId}
                                    </td>
                                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => handleUpdate(user._id)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((user, idx) => (
                        <div key={idx} className="bg-white shadow-md rounded-xl border border-gray-200 p-6 flex flex-col items-center">
                            <img
                                src={user.image ? `http://localhost:8080/photos/${user.image}` : defaulImg}
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                            />
                            <div className="text-center mt-4 w-full">
                                <h2 className="text-lg font-bold text-gray-800 truncate">{user.name}</h2>
                                <p className="text-sm text-gray-600 mt-1 truncate">{user.email}</p>
                                <p className="text-xs text-gray-400 mt-1 truncate">User ID: {user.userId}</p>
                                {user.number && (
                                    <p className="text-xs text-gray-400 mt-1 truncate">Number: {user.number}</p>
                                )}
                            </div>
                            <div className="mt-4 flex justify-center space-x-4 w-full">
                                <button
                                    className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition flex-1"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600 transition flex-1"
                                    onClick={() => handleUpdate(user._id)}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {showUpdateForm && (
                <div className="fixed inset-0 bg-blur-10 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-3xl leading-none"
                            onClick={() => setShowUpdateForm(false)}
                            aria-label="Close update form"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-center">Update Contact</h2>
                        <form className="space-y-4" onSubmit={updateClicked}>
                            <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                                <label className="block mb-1 font-medium text-gray-700">Profile Image</label>
                                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md border border-gray-300">
                                    <img
                                        src={
                                            image instanceof File
                                                ? URL.createObjectURL(image)
                                                : typeof image === "string"
                                                    ? `http://localhost:8080/photos/${image}`
                                                    : defaulImg
                                        }
                                        className="w-12 h-12 object-cover rounded-full border"
                                        alt="Preview"
                                    />
                                    <label className="flex-1 text-sm text-gray-700">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setImage(e.target.files[0])
                                                }
                                            }}
                                        />
                                        <div className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-sm text-center hover:bg-blue-700">
                                            {image instanceof File ? image.name : "Change Image"}
                                        </div>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700 text-xl transition"
                                        title="Remove image"
                                        onClick={handleImageremove}
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Name</label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Number</label>
                                <input
                                    onChange={(e) => setNumber(e.target.value)}
                                    value={number}
                                    type="text"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
                            >
                                Update Contact
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

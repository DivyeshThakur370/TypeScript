import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        setToken(null);
        window.location.reload();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken); // auto-update state from localStorage
        }, 500); // check every 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">
                <Link to="/">Logo</Link>
            </div>

            <nav className="flex gap-4 text-gray-700 font-medium">
                {!token ? (
                    <>
                        <Link to="/signin" className="hover:text-blue-500 transition">
                            Sign In
                        </Link>
                        <Link to="/signup" className="hover:text-blue-500 transition">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/contact" className="hover:text-blue-500 transition">
                            Contact List
                        </Link>
                        <Link to="/create" className="hover:text-blue-500 transition">
                            Create List
                        </Link>
                        <div
                            className="cursor-pointer hover:text-blue-500 transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};

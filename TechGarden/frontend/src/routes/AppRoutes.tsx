import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { SignIn } from "../features/auth/Signin"
import { SignUp } from "../features/auth/Signup"
import { ContactForm } from "../features/ContactForm"
import { NotFound } from "../pages/NotFound"
import { PrivateRoute } from "./PrivateRoute"
import { ContactList } from "../features/ContactList"

export const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/signin"
                    element={
                        <SignIn />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <SignUp />
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <PrivateRoute>
                            <ContactList />
                        </PrivateRoute>
                    }
                />
                <Route path="/create" element={
                    <PrivateRoute>
                        <ContactForm />
                    </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

import { Navigate } from "react-router-dom"
import { childrenProp } from "../types/Contact"

export const PrivateRoute = ({ children }: childrenProp) => {
    const isTrue: string = JSON.parse(localStorage.getItem("token") as string)
    if (!isTrue) {
        return <Navigate to={"/signup"} />
    } else {
        return children
    }
}


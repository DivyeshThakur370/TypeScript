import { useState } from "react"

type userAuth = {
    name: string
    age: number
}
export const User = () => {
    const [info, setInfo] = useState<userAuth | null>({} as userAuth)
    const handleLogin = () => {
        setInfo({
            name: "Divyesh",
            age: 18
        })
    }
    const handleLogout = () => {
        setInfo(null)
    }
    return (
        <div>
            <div>
                User is Login Success fully
                {info?.name}
                {info?.age}
            </div>
            <button onClick={handleLogin}>Login</button>
            <button onCanPlay={handleLogout}>Logout</button>
        </div>
    )
}
import React from "react"

type inputProps = {
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const Input = ({ handleInput }: inputProps) => {
    return (
        <div>
            <input type="text" name="" id="" onChange={(e) => handleInput(e)} />
        </div>
    )
}
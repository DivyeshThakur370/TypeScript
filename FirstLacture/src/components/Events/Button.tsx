import React from "react";

type clickProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

export const Button = ({ handleClick }: clickProps) => {
    // const id = 1; 

    return (
        <button onClick={(e) => handleClick(e, 1)}>
            Click
        </button>
    );
};

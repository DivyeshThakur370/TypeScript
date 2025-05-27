import React from "react"

type childProps = {
    status?: string;
    children?: React.ReactNode
}
export const Oscar = (props: childProps) => {
    return (
        <div>{props.children}</div>
    )
}


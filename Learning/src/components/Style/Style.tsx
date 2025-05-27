import React from "react"

type styleProps = {
    styles: React.CSSProperties
}
export const Style = ({ styles }: styleProps) => {
    return (
        <div style={styles}>
            This is container
        </div>
    )
}
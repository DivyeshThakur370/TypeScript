type statusProps = {
    status?: string
    children: React.ReactNode
}

export const Heading = (props: statusProps) => {
    let msg: string = ""

    if (props.status === "Loading") {
        msg = "Loading"
    }
    if (props.status === "Success") {
        msg = "Success"
    }
    if (props.status === "Error") {
        msg = "Error"
    }

    return (
        <div>
            {`Your current state is ${msg}`}
        </div>
    )
}

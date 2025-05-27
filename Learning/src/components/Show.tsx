type infoProps = {
    name: string,
    time: string
}

export const Show = (props: infoProps) => {
    const isPass: boolean = true;
    return (
        <div>
            {`Hello ${props.name} , Good ${props.time} is Pass ${isPass}`}
        </div>
    )
}


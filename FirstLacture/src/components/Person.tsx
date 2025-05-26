type names = {
    fullname: {
        firstName: string,
        lastName: string
    }
}
export const Person = (props: names) => {
    return (
        <div>
            {`My name is ${props.fullname.firstName} ${props.fullname.lastName} `}
        </div>
    )
}
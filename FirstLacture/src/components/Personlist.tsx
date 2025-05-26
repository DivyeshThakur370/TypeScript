type stdInfoProps = {
    students: {
        name: string;
        marks: number;
        isPass: boolean;
    }[];
};

export const Personlist = (props: stdInfoProps) => {
    return (
        <div>
            <h2>Student List:</h2>
            {props.students.map((e, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <h3>Name: {e.name}</h3>
                    <p>Marks: {e.marks}</p>
                    <p>Status: {e.isPass ? "Pass" : "Fail"}</p>
                </div>
            ))}
        </div>
    );
};

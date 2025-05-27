import { Button } from "./Button";
import { Input } from "./Input";

export const Combiane = () => {
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        console.log("Button clicked!", event.target);
        console.log("ID is:", id);
    };
    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
    }

    return (
        <div>
            <Input handleInput={handleInputValue} />
            <Button handleClick={handleButtonClick} />
        </div>
    );
};



interface TextInputProps {
    type: string;
    placeholder: string;
    value: string;
    setValue: (val: string) => void;
    onSubmit: () => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {

    const {type, placeholder, value, setValue, onSubmit} = (props);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    {
        if(e.key === 'Enter')
            onSubmit();
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-lg text-gray-700 placeholder-gray-400 outline-none border-b border-gray-300 focus:[border:#ddd4f2] transition-all"
        />
    )
};

export default TextInput;
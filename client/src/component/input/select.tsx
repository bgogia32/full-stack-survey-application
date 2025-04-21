'use client';
import { QuestionOption } from "@/type";
import { useEffect, useState } from "react";

interface SelectInputProps {
    options: QuestionOption[];
    setValue: (val: string) => void;
    onSubmit: () => void;
    multiple: boolean;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {

    const {options, setValue, onSubmit, multiple} = props;

    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        const newSelected = multiple
          ? selected.includes(id)
            ? selected.filter((val) => val !== id)
            : [...selected, id]
          : selected.includes(id)
            ? []
            : [id];
      
        setSelected(newSelected);
      
        if (multiple) {
          setValue(newSelected.join(', '));
        } else {
          setValue(newSelected[0] ?? '');
        }
      };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) =>
        {
            if(e.key === 'Enter')
                onSubmit();
        }

        useEffect(() => {
            setSelected([]);
        }, [multiple]);

    return (
        <div>
            <div
                className="outline-none"
                onKeyDown={handleKeyDown}
            >
                <div className="flex flex-wrap gap-2">
                    {options.map((opt) => {
                    const isSelected = selected.includes(String(opt.question_option_id));
                    return (
                            <button
                                key={opt.question_option_id}
                                onClick={() => toggleSelection(String(opt.question_option_id))}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                                ${
                                    isSelected
                                    ? 'bg-[#0a0a23] text-white border-[#0a0a23]'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#0a0a23]'
                                }`}
                            >
                                {opt.option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
};

export default SelectInput;
'use client';
import { useSurveyStore } from "@/store/useSurveyStore";
import TextInput from "../input/text";
import { useState } from "react";
import SelectInput from "../input/select";
import {useRouter} from "next/navigation";


const RenderPlaceHolder = (inputType: string): string => {
    switch (inputType.toUpperCase()) {
        case "TEXT":
            return "Type here...";
        case 'NUMBER':
            return "+1 123 456 7890";
        case 'EMAIL':
            return "name@example.com";
        default:
            return "";
    }
}

const InputProvider: React.FC = () => {

    const surveyQuestions = useSurveyStore((state) => state.masterData.surveyQuestions);
    const currentQuestionIndex = useSurveyStore((state) => state.currentQuestionIndex);
    const RecordAnswer = useSurveyStore((state) => state.setAnswer);
    const setEmail = useSurveyStore((state) => state.setEmail);
    const setCurrenetIndex = useSurveyStore((state) => state.setCurrentQuestionIndex);
    const [answer, setAnswer] = useState<string>("");
    const router = useRouter();

    const RenderInput = (inputType: string) => {
        const placeholder = RenderPlaceHolder(inputType);
        switch(inputType.toUpperCase())
        {
            case "TEXT":
            case 'NUMBER':
            case 'EMAIL':
                return <TextInput
                        placeholder={placeholder}
                        value={answer}
                        setValue={setAnswer}
                        type={inputType.toLowerCase()}
                        onSubmit={onSubmit}
                        />
            case "SELECT":
            case "MULTISELECT":
                return <SelectInput
                        options={surveyQuestions[currentQuestionIndex].options ?? []}
                        setValue={setAnswer}
                        onSubmit={onSubmit}
                        multiple={inputType.toUpperCase() === "MULTISELECT"}
                        />
            default:
                return <TextInput
                placeholder={placeholder}
                value={answer}
                setValue={setAnswer}
                type={inputType.toLowerCase()}
                onSubmit={onSubmit}
                />
        }
    };

    const onSubmit = () => {
        if(answer.trim() == "")
            return;
        if(currentQuestionIndex === 0)
            setEmail(answer);
        else
            RecordAnswer(String(surveyQuestions[currentQuestionIndex].question_id), answer);
        setAnswer("");
        if(currentQuestionIndex < surveyQuestions.length - 1)
            setCurrenetIndex(currentQuestionIndex + 1);
        else{
            router.push('/thank-you');
        }

    };

    return (
        <div className="flex flex-col items-start space-y-4 w-full max-w-md">
          
			{RenderInput(surveyQuestions[currentQuestionIndex].answer_type)}
          
          {/* Button & Hint */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSubmit()}
              className="px-4 py-2 bg-[#0a0a23] text-white text-sm font-bold rounded-full shadow hover:scale-105 active:scale-95 transition-transform"
            >
              OK
            </button>
            <span className="text-sm text-gray-400">press <kbd>Enter ↵</kbd></span>
          </div>
        </div>
    )
};

export default InputProvider;
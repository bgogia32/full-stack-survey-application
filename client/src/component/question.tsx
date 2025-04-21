'use client';
import { useSurveyStore } from "@/store/useSurveyStore"
import { AnswerPayload, QuestionDomain } from "@/type";
import { useEffect, useState } from "react";
import InputProvider from "./provider/input-provider";


const Question: React.FC = () => {

    const surveyQuestions = useSurveyStore((state) => state.masterData.surveyQuestions);
    const currentQuestionIndex = useSurveyStore((state) => state.currentQuestionIndex);
    const domainConfig  = useSurveyStore((state) => state.masterData.questionDomain);
    const answers = useSurveyStore((state) => state.answers);
    const email = useSurveyStore((state) => state.email);
    const answerId = useSurveyStore((state) => state.answerId);
    const setAnswerId = useSurveyStore((state) => state.setAnswerId);

    const [currentDomain, setCurrentDomain] = useState<QuestionDomain>(domainConfig[0]);

    useEffect(() => {
        if(currentDomain.q_domain_id !== surveyQuestions[currentQuestionIndex].q_domain_id)
        {
            const domain = domainConfig.find((qd) => qd.q_domain_id === surveyQuestions[currentQuestionIndex].q_domain_id);
            setCurrentDomain(domain ?? currentDomain);
            PostAnswers();
        }
    });

    const PostAnswers = async () => {
        try 
        {
          if(String(answerId).trim() != "")
            {
              const res = await fetch('http://localhost:4000/api/answer/' + String(answerId), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
              });
          
              if (!res.ok) 
                console.error(`API Error: ${res.status}`);
            }
            else if(email.trim() != "")
            {
              const payload: AnswerPayload = {
                email: email,
                answers: {email : "Survey Started"}
              };
  
              const res = await fetch('http://localhost:4000/api/answer', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });
  
              if (!res.ok) 
               console.error(`API Error: ${res.status}`);
              
              const data = await res.json();
              setAnswerId(data.answer_id.answer_id);
            }
        } catch (err) 
        {
          console.error('Submit Answer Failed:', err);
        }
      };


    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center px-4 md:px-12 pt-24 md:gap-12">
            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
              <img
                className="w-64 md:w-full h-auto pointer-events-none select-none"
                src={currentDomain.svg}
                alt="Waterlily Survey Questions"
              />
            </div>
    
          <div className="w-full md:w-2/3 max-w-4xl text-left">
            <h1 className="text-2xl md:text-4xl font-semibold text-[#0a0a23]">
              {currentDomain.description}
            </h1>
            <p className="mt-4 text-base md:text-xl text-gray-600">
              {surveyQuestions[currentQuestionIndex].title}
            </p>
            {currentQuestionIndex === 0 && (
                <p className="mt-4 text-base md:text-xl text-gray-600">
                    Let’s get your Email
                </p>)}
            <div className="mt-5 md:mt-10">
              <InputProvider/>
            </div>
                <div className="w-full bg-gray-500 rounded-full h-2.5 mb-4">
                    <div
                        className="bg-[#ddd4f2] h-2.5 rounded-full transition-all duration-300 mt-5"
                        style={{ width: `${((currentQuestionIndex + 1) / surveyQuestions.length) * 100}%` }}
                    ></div>
                </div>
          </div>
        </div>
    )
};

export default Question;
'use client';
import { useSurveyStore } from "@/store/useSurveyStore";
import { useEffect } from "react";

export default function ThankYouPage() {
    const surveyQuestions = useSurveyStore((s) => s.masterData.surveyQuestions);
    const answers = useSurveyStore((s) => s.answers);
    const answerId = useSurveyStore((state) => state.answerId);
  
    // Helper to get readable answer
    const getDisplayAnswer = (questionId: string): string => {
      const question = surveyQuestions.find(q => q.question_id === questionId);
      const raw = answers[questionId];
  
      if (!question || raw === undefined) return '—';
  
      if (['SELECT', 'MULTISELECT'].includes(question.answer_type.toUpperCase())) {
        const selectedIds = raw.split(',').map((id) => id.trim());
        const labels = question.options
          ?.filter(opt => selectedIds.includes(String(opt.question_option_id)))
          .map(opt => opt.option);
  
        return labels?.join(', ') || '—';
      }
  
      return raw;
    };
    
    const PostFinalAnswer = async () => {
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

    useEffect(() => {
        PostFinalAnswer();
    }, [])
  
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-6 text-center">🎉 Thank You!</h1>
        <p className="text-lg text-gray-600 mb-10 text-center">Here’s a summary of your responses:</p>
  
        <div className="space-y-6">
          {surveyQuestions.map((q) => (
            <div key={q.question_id} className="p-4 rounded bg-gray-100 shadow-sm">
              <p className="font-medium text-[#0a0a23]">{q.title}</p>
              <p className="mt-2 text-gray-700">
                {getDisplayAnswer(q.question_id)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
import { MasterData } from "../type"
import { create } from 'zustand';

type SurveyStore = {
    masterData: MasterData;

    currentQuestionIndex: number;

    email: string;

    answerId: string;

    answers: Record<string, string>;

    setMasterData: (masterData: MasterData) => void;
    setCurrentQuestionIndex: (index: number) => void;
    setEmail: (email: string) => void;
    setAnswer: (question_id: string, answer: string) => void;
    setAnswerId: (answerId: string) => void;

}

export const useSurveyStore = create<SurveyStore>((set) => ({
  masterData: {
    questionDomain: [{
        q_domain_id: "1",
        domain: "Welcome",
        description: "Let’s get to know you.",
        svg: "/careplan.svg"
    }],
    surveyQuestions: [{
        question_id: "1",
        q_domain_id: "1",
        answer_type: "TEXT", //replace with env variable
        title: "A few thoughtful questions now help us better understand your future care needs and costs. It only takes a minute — and it’s worth it!", //replace with env variable
     }]
  },

    currentQuestionIndex: 0,

    email: "",

    answerId: "",

    answers: {},
    
    setMasterData: (masterData) =>
      set((state) => ({
        masterData: {
          questionDomain: [...state.masterData.questionDomain, ...masterData.questionDomain],
          surveyQuestions: [...state.masterData.surveyQuestions, ...masterData.surveyQuestions]
        }
      })),

    setCurrentQuestionIndex: (index) => set({currentQuestionIndex: index}),

    setEmail: (email) => set({email: email}),

    setAnswerId: (answerId) => set({answerId: answerId}),

    setAnswer: (question_id, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [question_id]: answer,
          }
        }))

}));
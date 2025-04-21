type Question = {
    question_id: string;
    q_domain_id: string;
    answer_type: string;
    title: string;
    options?: QuestionOption[];
};

type QuestionOption = {
  question_option_id: string;
  question_id: string;
  option: string;
}

type QuestionDomain = {
    q_domain_id: string;
    domain: string;
    description: string;
    svg: string;
  };

type AnswerType = {
    answer_type_id: string;
    answer_type: string;
  };

  type AnswerPayload = {
    email: string;
    answers: Record<string, string>;
  };

  type MasterData = {
    questionDomain: QuestionDomain[];
    surveyQuestions: Question[];
  }
  
  

export type {Question, QuestionDomain, AnswerType, QuestionOption, AnswerPayload, MasterData};
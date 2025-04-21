"use client"
import { MasterData } from "@/type";
import Question from "../question";
import { useEffect } from "react";
import { useSurveyStore } from "@/store/useSurveyStore";

interface SurveyProviderProps {
    masterData: MasterData;
}

const SurveyProvider: React.FC<SurveyProviderProps> = (props) => {
    const { masterData } = props;

    const setMasterData = useSurveyStore((state) => state.setMasterData);
    const globalMasterData = useSurveyStore((state) => state.masterData);

    useEffect(() => {
      if(globalMasterData.surveyQuestions.length <= 1)
        setMasterData(masterData);
      }, [masterData]);
    
return (
    <Question/>
  );
}

export default SurveyProvider;
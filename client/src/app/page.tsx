import SurveyProvider from "@/component/provider/survey-provider";
import { MasterData } from "@/type";


const GetMasterData =  async (): Promise<MasterData> => {
    
    try 
    {
        const res = await fetch('http://localhost:4000/api/master-data', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!res.ok) {
            console.error('Failed to fetch master data:', res.status);
            throw new Error;
          }
      
          const resData = await res.json();
          return resData;
    }
    catch(error)
    {
        console.error("Failed to get master Data", error);
        return {questionDomain: [], surveyQuestions: []};
    }
}
export default async function Home()
{

    const masterData = await GetMasterData();
    
    return (
        <div>
            <SurveyProvider
                masterData={masterData}
            />
        </div>
    );
}
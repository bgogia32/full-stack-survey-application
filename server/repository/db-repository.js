const db = require('./db-client');


const dbRepo = {
    
    getDomains: async () => {
        try
        {
            const rows = await db('question_domain')
            .select(    'q_domain_id',
                        'domain',
                        'description',
                        'svg'
                    );
            return rows;
        }
        catch (error)
        {
            console.error('Unable to get Question Domains');
            return [];
        }
    },

    getQuestions: async () => {
        try 
        {
            const questions = await db('question')
            .select(
              'question.question_id',
              'question.title',
              'question.q_domain_id',   
              'answer_type.answer_type as answer_type'
            )
            .join('answer_type', 'question.answer_type_id', 'answer_type.answer_type_id');

            const questionIdsWithOptions = questions
                .filter(q => !(q.answer_type.toUpperCase() === 'TEXT'))
                .map(q => q.question_id);

            const questionOptions = await dbRepo.getQuestionOptions(questionIdsWithOptions);

            const groupedOptions = questionOptions.reduce((acc, option) => {
                if (!acc[option.question_id]) {
                  acc[option.question_id] = [];
                }
                acc[option.question_id].push(option);
                return acc;
              }, {});

            const updatedQuestions = questions.map(q => ({
                ...q,
                options: groupedOptions[q.question_id] || null,
              }));
          
              return updatedQuestions;
        }
        catch(error)
        {
            console.error("Unable to get Questions", error);
        }
    },

    getQuestionOptions: async (questionIds) => {
        try
        {
            const options = await db('question_option')
                            .whereIn('question_id', questionIds)
                            .select('question_option_id',
                                     'question_id',
                                     'option' 
                            );
            return options;
        }
        catch(error)
        {
            console.error("Unable to get Question Options", error);
            return [];
        }
    },

    postAnswer: async (asnwerPayload) => {
        try
        {
            return await db('answer').insert(
                {
                    email: asnwerPayload.email,
                    answer: JSON.stringify(asnwerPayload.answers),
                    created_at: new Date()
                }
            )
            .returning('answer_id');
        }
        catch(error)
        {
            console.error("Unable to post answer", error);
            return 0;
        }
      },

      updateAnswer: async (answer_id, answers) => {
        try 
        {
            const updatedData = {
                answer: JSON.stringify(answers),
                updated_at: new Date()
            };

            const updated = await db('answer')
                            .where('answer_id', answer_id)
                            .update(updatedData);
            return updated > 0;
        }
        catch(error)
        {
            console.error("Unable to put answer", error);
            return false;
        }
      }
};

module.exports = dbRepo;
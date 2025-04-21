module.exports.seed = async function seed(knex) {
  // Order matters: delete child tables first
  await knex('question_option').del();
  await knex('question').del();
  await knex('answer_type').del();
  await knex('question_domain').del();

  // 1. Question Domains
  await knex('question_domain').insert([
    {
      q_domain_id: 1,
      domain: 'DEMOGRAPHIC',
      description: 'Let’s get to know you',
      svg: '/demo.svg',
    },
    {
      q_domain_id: 2,
      domain: 'HEALTH',
      description: 'Let’s get to know your health',
      svg: '/health.svg',
    },
    {
      q_domain_id: 3,
      domain: 'FINANCIAL',
      description: 'Let’s get to know your finances',
      svg: '/finance.svg',
    },
  ]);

  // 2. Answer Types
  await knex('answer_type').insert([
    { answer_type_id: 1, answer_type: 'TEXT' },
    { answer_type_id: 2, answer_type: 'SELECT' },
    { answer_type_id: 3, answer_type: 'MULTISELECT' },
    { answer_type_id: 4, answer_type: 'EMAIL' },
    { answer_type_id: 5, answer_type: 'NUMBER' },
  ]);

  // 3. Questions
  await knex('question').insert([
    // DEMOGRAPHIC (1–5)
    { question_id: 1, q_domain_id: 1, answer_type_id: 1, title: 'What is your full name?' },
    { question_id: 2, q_domain_id: 1, answer_type_id: 1, title: 'What is your date of birth?' },
    { question_id: 3, q_domain_id: 1, answer_type_id: 2, title: 'What is your gender?' },
    { question_id: 4, q_domain_id: 1, answer_type_id: 1, title: 'What is your current living arrangement?' },
    { question_id: 5, q_domain_id: 1, answer_type_id: 2, title: 'Do you live alone or with others?' },

    // HEALTH (6–10)
    { question_id: 6, q_domain_id: 2, answer_type_id: 3, title: 'Do you have any of the following health conditions?' },
    { question_id: 7, q_domain_id: 2, answer_type_id: 2, title: 'How would you rate your general health?' },
    { question_id: 8, q_domain_id: 2, answer_type_id: 2, title: 'Do you need assistance with daily activities?' },
    { question_id: 9, q_domain_id: 2, answer_type_id: 1, title: 'List any medications you currently take.' },
    { question_id: 10, q_domain_id: 2, answer_type_id: 2, title: 'Have you had any hospital visits in the last year?' },

    // FINANCIAL (11–15)
    { question_id: 11, q_domain_id: 3, answer_type_id: 2, title: 'What is your current annual income range?' },
    { question_id: 12, q_domain_id: 3, answer_type_id: 2, title: 'Do you have long-term care insurance?' },
    { question_id: 13, q_domain_id: 3, answer_type_id: 2, title: 'Do you own or rent your home?' },
    { question_id: 14, q_domain_id: 3, answer_type_id: 1, title: 'What are your primary sources of income?' },
    { question_id: 15, q_domain_id: 3, answer_type_id: 2, title: 'Have you set aside savings for healthcare needs?' },
  ]);

  // 4. Question Options (only for MCQ / MULTI_SELECT questions)
  await knex('question_option').insert([
    // Gender
    { question_option_id: 1, question_id: 3, answer_type_id: 2, option: 'Male' },
    { question_option_id: 2, question_id: 3, answer_type_id: 2, option: 'Female' },
    { question_option_id: 3, question_id: 3, answer_type_id: 2, option: 'Non-binary' },
    { question_option_id: 4, question_id: 3, answer_type_id: 2, option: 'Prefer not to say' },

    // Living alone
    { question_option_id: 5, question_id: 5, answer_type_id: 2, option: 'Alone' },
    { question_option_id: 6, question_id: 5, answer_type_id: 2, option: 'With spouse/partner' },
    { question_option_id: 7, question_id: 5, answer_type_id: 2, option: 'With children or others' },

    // Health conditions
    { question_option_id: 8, question_id: 6, answer_type_id: 3, option: 'Diabetes' },
    { question_option_id: 9, question_id: 6, answer_type_id: 3, option: 'Hypertension' },
    { question_option_id: 10, question_id: 6, answer_type_id: 3, option: 'Heart Disease' },
    { question_option_id: 11, question_id: 6, answer_type_id: 3, option: 'None of the above' },

    // Health rating
    { question_option_id: 12, question_id: 7, answer_type_id: 2, option: 'Excellent' },
    { question_option_id: 13, question_id: 7, answer_type_id: 2, option: 'Good' },
    { question_option_id: 14, question_id: 7, answer_type_id: 2, option: 'Fair' },
    { question_option_id: 15, question_id: 7, answer_type_id: 2, option: 'Poor' },

    // Assistance
    { question_option_id: 16, question_id: 8, answer_type_id: 2, option: 'Yes' },
    { question_option_id: 17, question_id: 8, answer_type_id: 2, option: 'No' },

    // Hospital visits
    { question_option_id: 18, question_id: 10, answer_type_id: 2, option: 'Yes' },
    { question_option_id: 19, question_id: 10, answer_type_id: 2, option: 'No' },

    // Income
    { question_option_id: 20, question_id: 11, answer_type_id: 2, option: 'Less than $25,000' },
    { question_option_id: 21, question_id: 11, answer_type_id: 2, option: '$25,000 - $50,000' },
    { question_option_id: 22, question_id: 11, answer_type_id: 2, option: '$50,001 - $100,000' },
    { question_option_id: 23, question_id: 11, answer_type_id: 2, option: 'More than $100,000' },

    // LTC Insurance
    { question_option_id: 24, question_id: 12, answer_type_id: 2, option: 'Yes' },
    { question_option_id: 25, question_id: 12, answer_type_id: 2, option: 'No' },
    { question_option_id: 26, question_id: 12, answer_type_id: 2, option: 'Not sure' },

    // Own or rent
    { question_option_id: 27, question_id: 13, answer_type_id: 2, option: 'Own' },
    { question_option_id: 28, question_id: 13, answer_type_id: 2, option: 'Rent' },
    { question_option_id: 29, question_id: 13, answer_type_id: 2, option: 'Other' },

    // Healthcare savings
    { question_option_id: 30, question_id: 15, answer_type_id: 2, option: 'Yes' },
    { question_option_id: 31, question_id: 15, answer_type_id: 2, option: 'No' },
    { question_option_id: 32, question_id: 15, answer_type_id: 2, option: 'Planning to' },
  ]);
}

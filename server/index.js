const express = require('express');
const cors = require('cors');
const dbRepo = require('./repository/db-repository');

const app = express();

app.use(cors());
app.use(express.json());

// GET: Questions (with options if applicable)
app.get('/api/master-data', async (req, res) => {
  const questionDomain = await dbRepo.getDomains();
  const surveyQuestions = await dbRepo.getQuestions();
  res.json({questionDomain, surveyQuestions});
});

// POST: Submit Answers
app.post('/api/answer', async (req, res) => {
  const answerPayload = req.body;
  const result = await dbRepo.postAnswer(answerPayload);
  res.json({ answer_id: result[0] });
});

// PUT: Update Answers
app.put('/api/answer/:answer_id', async (req, res) => {
  const answer_id = parseInt(req.params.answer_id);
  const answers = req.body.answers;

  const success = await dbRepo.updateAnswer(answer_id, answers);
  res.status(success ? 200 : 500).json({ success });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

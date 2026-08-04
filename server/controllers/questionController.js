import Question from '../models/Question.js';

// @desc    Get all questions (with filtering)
// @route   GET /api/questions
// @access  Private
const getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const questions = await Question.find(query).select('title difficulty category platform companyTags topicTags');
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Private
const getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404);
      throw new Error('Question not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new question (Admin)
// @route   POST /api/questions
// @access  Private/Admin
const createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

export { getQuestions, getQuestionById, createQuestion };

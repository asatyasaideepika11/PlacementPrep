import express from 'express';
import { getQuestions, getQuestionById, createQuestion } from '../controllers/questionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getQuestions)
  .post(protect, createQuestion);

router.route('/:id')
  .get(protect, getQuestionById);

export default router;

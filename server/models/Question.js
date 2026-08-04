import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    category: { type: String, required: true },
    platform: { type: String, default: 'PlacementPrep' },
    companyTags: [{ type: String }],
    topicTags: [{ type: String }],
    youtubeLink: { type: String, default: '' },
    articleLink: { type: String, default: '' },
    problemLink: { type: String, default: '' },
    solutionLink: { type: String, default: '' },
    hints: [{ type: String }],
    notes: { type: String, default: '' },
    timeComplexity: { type: String, default: 'O(N)' },
    spaceComplexity: { type: String, default: 'O(N)' },
    description: { type: String, required: true },
    examples: [
      {
        input: { type: String },
        output: { type: String },
        explanation: { type: String },
      },
    ],
    constraints: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);

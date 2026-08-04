import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled Note',
    },
    content: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Note', noteSchema);

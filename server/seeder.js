import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Question from './models/Question.js';

dotenv.config();
connectDB();

const questions = [
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    companyTags: ['Amazon', 'Google', 'Facebook'],
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
    ],
    constraints: ['2 <= nums.length <= 10^4']
  },
  {
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    companyTags: ['Microsoft', 'Apple'],
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }
    ]
  },
  {
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Strings',
    companyTags: ['Amazon', 'Microsoft'],
    description: 'Given a string s, return the longest palindromic substring in s.',
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' }
    ]
  },
  {
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    category: 'Linked List',
    companyTags: ['Facebook', 'Amazon', 'Google'],
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }
    ]
  }
];

const importData = async () => {
  try {
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();

import asyncHandler from "express-async-handler";
import Result from "../models/resultModel.js";

// @desc Save cheating log data
// @route POST /api/cheatingLogs
// @access Private
const saveResult = asyncHandler(async (req, res) => {
  const { correctAnswers, examId, username, email } = req.body;
  console.log('saveResult received:', { correctAnswers, examId, username, email });

  const resultLog = new Result({
    correctAnswers,
    examId,
    username,
    email,
    // role,
  });

  const savedResult = await resultLog.save();
  console.log('saveResult saved:', savedResult);

  if (savedResult) {
    res.status(201).json(savedResult);
  } else {
    res.status(400);
    throw new Error("Invalid Cheating Log Data");
  }
});

// @desc Get all cheating log data for a specific exam
// @route GET /api/cheatingLogs/:examId
// @access Private
const getResultLogs = asyncHandler(async (req, res) => {
  const examId = req.params.examId;
  console.log('getResultLogs examId:', examId);
  const resultLogs = await Result.find({ examId });
  console.log('getResultLogs found:', resultLogs);
  res.status(200).json(resultLogs);
});

export { saveResult, getResultLogs };

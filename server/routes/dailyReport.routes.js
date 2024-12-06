import express from 'express';
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} from '../controllers/dailyReports.controller.js';

const router = express.Router();

// Create a new report
router.post('/add', createReport);

// Get all reports
router.get('/', getAllReports);

// Get a single report by ID
router.get('/:id', getReportById);

// Update a report
router.put('/update/:id', updateReport);

// Delete a report
router.delete('/delete/:id', deleteReport);

export default router;

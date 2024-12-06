import SiteDailyReport from '../models/dailyReport.model.js';

// Create a new report
export const createReport = async (req, res) => {
  try {
    const report = new SiteDailyReport(req.body);
    await report.save();
    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report', error: error.message });
  }
};

// Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await SiteDailyReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
  }
};

// Get a single report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await SiteDailyReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch report', error: error.message });
  }
};

// Update a report
export const updateReport = async (req, res) => {
  try {
    const report = await SiteDailyReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ message: 'Report updated successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update report', error: error.message });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const report = await SiteDailyReport.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete report', error: error.message });
  }
};

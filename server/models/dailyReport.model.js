import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  workers: { type: String, required: true },
});

const contractorSchema = new Schema({
  contractorName: { type: String, required: true },
  typeOfWork: { type: String, required: true },
  comment: { type: String },
});

const visitorSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
});

const siteDailyReportSchema = new Schema({
  date: { type: Date, required: true },
  siteName: { type: String, required: true },
  staffCount: { type: Number, required: true },
  tasks: [taskSchema],
  contractors: [contractorSchema],
  visitors: [visitorSchema],
}, { timestamps: true });

const SiteDailyReport = mongoose.model('SiteDailyReport', siteDailyReportSchema);

export default SiteDailyReport;

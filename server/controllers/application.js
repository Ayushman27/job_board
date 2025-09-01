import Application from '../models/Application.js';


export const applyToJob = async (req, res) => {
const { jobId } = req.params;
const resumeUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
const application = await Application.create({ job: jobId, candidate: req.user._id, resumeUrl });
res.status(201).json(application);
};


export const listApplicantsForJob = async (req, res) => {
const { jobId } = req.params;
const apps = await Application.find({ job: jobId }).populate('candidate', 'name email');
res.json(apps);
};


export const myApplications = async (req, res) => {
const apps = await Application.find({ candidate: req.user._id }).populate('job');
res.json(apps);
};
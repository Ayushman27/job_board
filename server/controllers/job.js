import Job from '../models/Job.js';


export const listJobs = async (req, res) => {
const { q, skills, location, minSalary } = req.query;
const filter = { isActive: true };
if (q) filter.title = { $regex: q, $options: 'i' };
if (location) filter.location = { $regex: location, $options: 'i' };
if (skills) filter.skills = { $in: skills.split(',').map((s) => s.trim()) };
if (minSalary) filter.salary = { $gte: Number(minSalary) };
const jobs = await Job.find(filter).sort({ createdAt: -1 }).populate('employer', 'name');
res.json(jobs);
};


export const getJob = async (req, res) => {
const job = await Job.findById(req.params.id).populate('employer', 'name');
if (!job) return res.status(404).json({ message: 'Job not found' });
res.json(job);
};


export const createJob = async (req, res) => {
const job = await Job.create({ ...req.body, employer: req.user._id });
res.status(201).json(job);
};


export const updateJob = async (req, res) => {
const job = await Job.findOneAndUpdate(
{ _id: req.params.id, employer: req.user._id },
req.body,
{ new: true }
);
if (!job) return res.status(404).json({ message: 'Job not found or not yours' });
res.json(job);
};


export const removeJob = async (req, res) => {
const job = await Job.findOneAndDelete({ _id: req.params.id, employer: req.user._id });
if (!job) return res.status(404).json({ message: 'Job not found or not yours' });
res.json({ message: 'Deleted' });
};
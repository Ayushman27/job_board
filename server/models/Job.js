import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema(
{
title: { type: String, required: true },
description: { type: String, required: true },
skills: [{ type: String }],
salary: { type: Number },
location: { type: String },
employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
isActive: { type: Boolean, default: true }
},
{ timestamps: true }
);


export default mongoose.model('Job', jobSchema);
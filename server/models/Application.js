import mongoose from 'mongoose';


const applicationSchema = new mongoose.Schema(
{
job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
resumeUrl: { type: String },
status: { type: String, enum: ['submitted', 'reviewed', 'rejected', 'accepted'], default: 'submitted' }
},
{ timestamps: true }
);


export default mongoose.model('Application', applicationSchema);
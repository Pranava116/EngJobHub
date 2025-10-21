import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
	company: { type: String, required: true, trim: true },
	description: { type: String, required: true, trim: true },
	location: { type: String, required: true, trim: true },
	type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], required: true },
	salary: { type: Number },
	postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	applicants: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	}]
}, { timestamps: true });

jobSchema.index({ company: 'text', description: 'text', location: 'text' });

export default mongoose.model('Job', jobSchema);



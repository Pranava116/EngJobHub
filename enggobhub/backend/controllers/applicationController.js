import Application from '../model/Application.js';
import Job from '../model/Jobs.js';

export const applyForJob = async (req, res) => {
	try {
		if (!req.user || req.user.role !== 'student') {
			return res.status(403).json({ message: 'Only students can apply for jobs' });
		}
		const { jobId, resume } = req.body;
		if (!jobId) {
			return res.status(400).json({ message: 'jobId is required' });
		}

		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({ message: 'Job not found' });
		}

		const existingApplication = await Application.findOne({ 
			job: jobId, 
			applicant: req.user.id 
		});
		if (existingApplication) {
			return res.status(409).json({ message: 'Already applied for this job' });
		}

		const application = await Application.create({
			job: jobId,
			applicant: req.user.id,
			resume : resume
		});

		await application.populate('job', 'title company location');
		return res.status(201).json({ 
			message: 'Application submitted successfully', 
			application 
		});
	} catch (error) {
		return res.status(500).json({ message: 'Failed to submit application', error: error.message });
	}
};

export const getMyApplications = async (req, res) => {
	try {
		if (!req.user || req.user.role !== 'student') {
			return res.status(403).json({ message: 'Only students can view their applications' });
		}
		const applications = await Application.find({ applicant: req.user.id })
			.populate('job', 'title company location type salary')
			.sort({ appliedAt: -1 });
		return res.json(applications);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
	}
};

export const getJobApplications = async (req, res) => {
	try {
		if (!req.user || req.user.role !== 'hr') {
			return res.status(403).json({ message: 'Only HR can view job applications' });
		}
		const { jobId } = req.params;
		
		const job = await Job.findOne({ _id: jobId, postedBy: req.user.id });
		if (!job) {
			return res.status(404).json({ message: 'Job not found or unauthorized' });
		}

		const applications = await Application.find({ job: jobId })
			.populate('applicant', 'name email')
			.sort({ appliedAt: -1 });
		return res.json(applications);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch job applications', error: error.message });
	}
};

export const updateApplicationStatus = async (req, res) => {
	try {
		if (!req.user || req.user.role !== 'hr') {
			return res.status(403).json({ message: 'Only HR can update application status' });
		}
		const { applicationId } = req.params;
		const { status } = req.body;
		
		if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
			return res.status(400).json({ message: 'Invalid status' });
		}

		const application = await Application.findById(applicationId)
			.populate('job', 'postedBy');
		
		if (!application) {
			return res.status(404).json({ message: 'Application not found' });
		}

		if (application.job.postedBy.toString() !== req.user.id) {
			return res.status(403).json({ message: 'Unauthorized to update this application' });
		}

		application.status = status;
		await application.save();

		return res.json({ message: 'Application status updated', application });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to update application status', error: error.message });
	}
};

import Job from '../model/Jobs.js';

export const createJob = async (req, res) => {
	try {
		const { company, description, location, type, salary } = req.body;
		if (!company || !description || !location || !type) {
			return res.status(400).json({ message: 'company, description, location, type are required' });
		}
		const job = await Job.create({
			company,
			description,
			location,
			type,
			salary,
			postedBy: req.user.id
		});
		return res.status(201).json({ message: 'Job created', job });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to create job', error: error.message });
	}
};

export const listJobs = async (req, res) => {
	try {
		const { q } = req.query;
		let filter = {};
		if (q) {
			filter = { $text: { $search: q } };
		}
		const jobs = await Job.find(filter).sort({ createdAt: -1 })
			.populate('postedBy', 'name email role')
			.populate('applicants', 'name email');
		return res.json(jobs);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to list jobs', error: error.message });
	}
};
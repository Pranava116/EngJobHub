import Jobs from '../model/Jobs.js';

export const createJob = async (req, res) => {
  try {
    const { company, description, location, type, salary } = req.body;
    if (!company || !description || !location || !type)
      return res.status(400).json({ message: 'Company, description, location, type are required' });

    const job = await Jobs.create({
      company, description, location, type, salary, postedBy: req.user.id
    });

    await job.populate('postedBy', '_id name email role');
    res.status(201).json({ message: 'Job created', job });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
};

// List all jobs
export const listJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find()
      .sort({ createdAt: -1 })
      .populate('postedBy', '_id name email role')
      .populate('applicants', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to list jobs', error: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user.id.toString())
      return res.status(403).json({ message: 'Not allowed' });

    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch jobs posted by the logged-in HR
export const myJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name email role')
      .populate('applicants', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your jobs', error: err.message });
  }
};


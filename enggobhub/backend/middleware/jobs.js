export const validateJobBody = (req, res, next) => {
	const { company, description, location, type, salary } = req.body;
	if (!company || !description || !location || !type) {
		return res.status(400).json({ message: 'company, description, location, type are required' });
	}
	if (salary !== undefined && typeof salary !== 'number') {
		return res.status(400).json({ message: 'salary must be a number' });
	}
	return next();
};



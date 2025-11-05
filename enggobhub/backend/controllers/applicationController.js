import Application from "../model/Application.js";
import Jobs from "../model/Jobs.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";


export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    
    const job = await Jobs.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    
    const existingApp = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApp)
      return res.status(400).json({ message: "You already applied for this job" });

    
    let resumeUrl = null;
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
         resource_type: "image", 
  		folder: "resumes",
  		access_mode: "public",
      });
      resumeUrl = uploaded.secure_url;
      fs.unlinkSync(req.file.path); // cleanup local file
    }

    
    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: resumeUrl,
      status: "pending",
    });

    
    job.applicants.push(userId);
    await job.save();

    res.status(201).json({
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error("❌ Error applying for job:", error);
    res.status(500).json({ message: "Something went wrong while applying", error: error.message });
  }
};


export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job", "company description location type salary");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};


export const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("applicant", "name email");
    res.json(applications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ message: "Failed to fetch job applications", error: error.message });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();

    res.json({ message: "Application status updated", application });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

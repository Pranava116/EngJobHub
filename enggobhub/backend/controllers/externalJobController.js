import axios from 'axios';
import fs from 'fs/promises';
import pdfParse from 'pdf-parse';

const SOURCE_WHITELIST = [
  'linkedin',
  'indeed',
  'glassdoor',
  'naukri',
  'monster',
  'ziprecruiter',
  'hired',
  'timesjobs',
];

const ROLE_CATALOG = [
  'software engineer',
  'frontend developer',
  'backend developer',
  'full stack developer',
  'data scientist',
  'data analyst',
  'ml engineer',
  'ai engineer',
  'devops engineer',
  'cloud engineer',
  'mobile developer',
  'android developer',
  'ios developer',
  'product manager',
  'ui designer',
  'ux designer',
];

const SKILL_DICTIONARY = [
  'react',
  'react.js',
  'node',
  'node.js',
  'express',
  'mongodb',
  'sql',
  'mysql',
  'python',
  'django',
  'flask',
  'java',
  'spring',
  'c++',
  'c#',
  'aws',
  'azure',
  'gcp',
  'docker',
  'kubernetes',
  'terraform',
  'jenkins',
  'git',
  'graphql',
  'typescript',
  'javascript',
  'html',
  'css',
  'tailwind',
  'next.js',
  'redux',
  'tensorflow',
  'pytorch',
  'pandas',
  'numpy',
  'power bi',
  'tableau',
  'flutter',
  'kotlin',
  'swift',
];

const rapidApiHeaders = () => {
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) {
    throw new Error('RAPIDAPI_KEY not configured');
  }

  return {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  };
};

const normalizeJobs = (payload = []) => {
  return payload.map((item) => ({
    id: item?.job_id || `${item?.job_title}-${item?.job_city}-${item?.job_country}`,
    title: item?.job_title || 'Untitled',
    company: item?.employer_name || 'Unknown',
    location: [item?.job_city, item?.job_state, item?.job_country].filter(Boolean).join(', '),
    salary: item?.job_salary || item?.job_min_salary || null,
    description: item?.job_description || '',
    applyLink: item?.job_apply_link || item?.job_posting_url || null,
    postedAt: item?.job_posted_at_datetime_utc || item?.job_posted_at || null,
    source: item?.job_publisher || 'External',
    remote: Boolean(item?.job_is_remote),
    logo: item?.employer_logo || null,
  }));
};

const searchRapidApiJobs = async ({ query, location = 'India', page = 1 }) => {
  const url = 'https://jsearch.p.rapidapi.com/search';
  const params = {
    query: `${query} in ${location}`,
    page,
    num_pages: 1,
    date_posted: 'all',
  };

  const headers = rapidApiHeaders();
  const { data } = await axios.get(url, { params, headers });
  return Array.isArray(data?.data) ? data.data : [];
};

const extractTextFromResume = async (file) => {
  const buffer = await fs.readFile(file.path);
  const isPdf = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    const { text } = await pdfParse(buffer);
    return text || '';
  }

  return buffer.toString('utf-8');
};

const analyzeResume = (text) => {
  const normalized = text.toLowerCase();
  const matchedSkills = SKILL_DICTIONARY.filter((skill) => normalized.includes(skill));

  const roleMatch = ROLE_CATALOG.find((role) => normalized.includes(role));
  const experienceMatch = normalized.match(/(\d+)\s+(?:\+)?\s*years?/);

  let seniority = 'Associate';
  if (/intern|fresher|entry/.test(normalized)) seniority = 'Intern';
  else if (/junior/.test(normalized)) seniority = 'Junior';
  else if (/senior|lead|principal/.test(normalized)) seniority = 'Senior';

  const focusSkills = matchedSkills.length ? matchedSkills : normalized
    .split(/\s+/)
    .filter((token) => token.length > 4)
    .slice(0, 5);

  const queryParts = [
    seniority,
    roleMatch ? roleMatch : 'software engineer',
    focusSkills.slice(0, 3).join(' '),
  ].filter(Boolean);

  const query = queryParts.join(' ').trim();

  return {
    focusSkills: [...new Set(focusSkills)].slice(0, 10),
    seniority,
    yearsExperience: experienceMatch ? Number(experienceMatch[1]) : null,
    query: query || 'software engineer',
  };
};

const filterPreferredSources = (jobs) => {
  if (!jobs.length) return [];

  const preferred = jobs.filter((item) => {
    const publisher = (item?.job_publisher || '').toLowerCase();
    const applyLink = (item?.job_apply_link || '').toLowerCase();
    const posting = (item?.job_posting_url || '').toLowerCase();
    return SOURCE_WHITELIST.some((source) => publisher.includes(source) || applyLink.includes(source) || posting.includes(source));
  });

  return preferred.length ? preferred : jobs;
};

export const getIndeedJobs = async (req, res) => {
  try {
    const { query = 'software engineer', location = 'India', page = '1' } = req.query;
    const results = await searchRapidApiJobs({ query, location, page });
    const indeedOnly = filterPreferredSources(results).filter((item) => {
      const publisher = (item?.job_publisher || '').toLowerCase();
      const applyLink = (item?.job_apply_link || '').toLowerCase();
      const posting = (item?.job_posting_url || '').toLowerCase();
      return publisher.includes('indeed') || applyLink.includes('indeed') || posting.includes('indeed');
    });

    const sourceList = indeedOnly.length ? indeedOnly : results;
    const normalized = normalizeJobs(sourceList);
    res.json({ jobs: normalized });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Indeed jobs', error: error?.response?.data || error.message });
  }
};

export const getAiFilteredJobs = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Resume file is required' });
  }

  try {
    const resumeText = await extractTextFromResume(req.file);
    if (!resumeText.trim()) {
      return res.status(400).json({ message: 'Unable to read resume content. Please upload a PDF resume.' });
    }

    const insights = analyzeResume(resumeText);
    const location = req.body?.location || 'India';
    let results = await searchRapidApiJobs({ query: insights.query, location });

    if (!results.length) {
      const fallbackQueries = [];
      const topSkills = (insights.focusSkills || []).slice(0, 3);
      topSkills.forEach((skill) => {
        fallbackQueries.push(`${insights.seniority} ${skill}`);
        fallbackQueries.push(`${skill} ${insights.query}`);
      });
      fallbackQueries.push(`${insights.query} remote`);
      fallbackQueries.push(`software engineer ${location}`);

      const uniqueQueries = [...new Set(fallbackQueries.filter(Boolean))].slice(0, 5);
      for (const q of uniqueQueries) {
        const extra = await searchRapidApiJobs({ query: q, location });
        if (extra.length) {
          results = extra;
          break;
        }
      }
    }

    let curated = filterPreferredSources(results);
    if (!curated.length) {
      curated = results;
    }
    curated = curated.slice(0, 15);
    const normalized = normalizeJobs(curated);
    const sourceSet = Array.from(new Set(normalized.map((job) => job.source))).filter(Boolean);

    res.json({
      query: insights.query,
      skills: insights.focusSkills,
      seniority: insights.seniority,
      yearsExperience: insights.yearsExperience,
      sources: sourceSet,
      jobs: normalized,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to run AI filter', error: error?.response?.data || error.message });
  } finally {
    try {
      if (req.file?.path) {
        await fs.unlink(req.file.path);
      }
    } catch (cleanupErr) {
      console.error('Failed to clean uploaded resume:', cleanupErr.message);
    }
  }
};

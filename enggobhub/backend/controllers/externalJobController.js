import axios from 'axios';

// Fetch jobs from external source (Indeed via RapidAPI/JSearch)
export const getIndeedJobs = async (req, res) => {
  try {
    const { query = 'software engineer', location = 'India', page = '1' } = req.query;

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    if (!rapidApiKey) {
      return res.status(500).json({ message: 'RAPIDAPI_KEY not configured' });
    }

    // JSearch search endpoint (use dynamic params)
    const url = 'https://jsearch.p.rapidapi.com/search';
    const params = {
      query: `${query} in ${location}`,
      page,
      num_pages: 1,
      date_posted: 'all',
    };

    const headers = {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    };

    const { data } = await axios.get(url, { params, headers });

    const results = Array.isArray(data?.data) ? data.data : [];

    // Prefer results that originated on Indeed if available
    const indeedOnly = results.filter((item) => {
        const publisher = (item?.job_publisher || '').toLowerCase();
        const applyLink = (item?.job_apply_link || item?.job_apply_link || '').toLowerCase();
        const posting = (item?.job_posting_url || '').toLowerCase();
        return publisher.includes('indeed') || applyLink.includes('indeed') || posting.includes('indeed');
      });

    const sourceList = indeedOnly.length ? indeedOnly : results;

    const normalized = sourceList.map((item) => ({
        id: item?.job_id || item?.job_id || `${item?.job_title}-${item?.job_city}-${item?.job_country}`,
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

    res.json({ jobs: normalized });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Indeed jobs', error: error?.response?.data || error.message });
  }
};



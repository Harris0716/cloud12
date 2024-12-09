import { getJobById } from './model.js';

export const getJobDetail = async (req, res) => {
  try {
    const jobInfo_id = req.params.id;
    const job = await getJobById(jobInfo_id);
    
    if (!job) {
      return res.status(404).json({ message: '工作機會不存在' });
    }

    res.json({
      id: job.jobInfo_id,
      title: job.positions,
      location: job.address,
      roomType: job.room_type,
      period: job.dates,
      description: job.job_description,
      position: job.positions,
      peopleNeeded: job.people_needed,
      images: job.detail_images,
      host: {
        name: job.host_name,
        image: job.host_image,
        rating: job.host_rating
      },
      benefits: job.benefits
    });
  } catch (error) {
    console.error('Error getting job detail:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
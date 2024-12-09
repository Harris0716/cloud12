import express from 'express';
import { getJobDetail } from './controllers.js';

const router = express.Router();

router.get('/jobs/:jobInfo_id', getJobDetail);

export default router;
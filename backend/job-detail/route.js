import express from 'express';
import { getJobDetail } from './controllers.js';

const router = express.Router();

router.get('/:jobInfo_id', getJobDetail);

export default router;
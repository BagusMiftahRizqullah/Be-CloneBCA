import express from 'express';
import { getContactInfo, getFooterQuickLinks, getFooterSocialLinks, getFooterPolicyLinks } from '../controllers/footer.controller.js';
const router = express.Router();
router.get('/contact', getContactInfo);
router.get('/quicklinks', getFooterQuickLinks);
router.get('/social', getFooterSocialLinks);
router.get('/policy', getFooterPolicyLinks);
export default router;

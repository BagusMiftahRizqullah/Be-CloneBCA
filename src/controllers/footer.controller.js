import { logger } from '../logger.js';
import { getContact, getQuickLinks, getSocialLinks, getPolicyLinks } from '../services/footer.service.js';

export async function getContactInfo(req, res) {
  try {
    const result = await getContact();
    res.json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
}

export async function getFooterQuickLinks(req, res) {
  try {
    const links = await getQuickLinks();
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch quick links' });
  }
}

export async function getFooterSocialLinks(req, res) {
  try {
    const links = await getSocialLinks();
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
}

export async function getFooterPolicyLinks(req, res) {
  try {
    const links = await getPolicyLinks();
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch policy links' });
  }
}
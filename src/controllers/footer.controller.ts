import { logger } from '../logger.js';
import { getContact, getQuickLinks, getSocialLinks, getPolicyLinks } from '../services/footer.service.js';
import type { Request, Response } from 'express';

export async function getContactInfo(req: Request, res: Response) {
  try {
    const result = await getContact();
    res.json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
}

export async function getFooterQuickLinks(req: Request, res: Response) {
  try {
    const links = await getQuickLinks();
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch quick links' });
  }
}

export async function getFooterSocialLinks(req: Request, res: Response) {
  try {
    const links = await getSocialLinks();
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
}

export async function getFooterPolicyLinks(req: Request, res: Response) {
  try {
    const links = await getPolicyLinks();
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch policy links' });
  }
}
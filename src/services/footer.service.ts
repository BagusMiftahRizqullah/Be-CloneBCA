import { prisma } from '../lib/db.js';
import type { ContactInfo, ContactMethod, QuickLink, SocialLink, PolicyLink } from '@prisma/client';

export async function getContact(): Promise<{ info: ContactInfo | null; methods: ContactMethod[] }> {
  const info = await prisma.contactInfo.findFirst();
  const methods = await prisma.contactMethod.findMany({ orderBy: { id: 'asc' } });
  return { info, methods };
}

export async function getQuickLinks(): Promise<QuickLink[]> {
  return prisma.quickLink.findMany({ orderBy: { order: 'asc' } });
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return prisma.socialLink.findMany({ orderBy: { order: 'asc' } });
}

export async function getPolicyLinks(): Promise<PolicyLink[]> {
  return prisma.policyLink.findMany({ orderBy: { order: 'asc' } });
}
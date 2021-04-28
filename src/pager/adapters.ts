import { PolicyLevel } from './policyLevel/policyLevel';
import { Pager } from './service'

export interface EPService {
  setPolicyLevel(policyLevel: PolicyLevel): void
  getPolicyLevel(): PolicyLevel;
}

export interface MailService {
  send(data: any): void
}

export interface SmsService {
  send(data: any): void
}

export interface TimesService {
  setTimer(): void
}

export interface PersistenceService {
  findOne(id: string): Pager,
  findAll(): Pager[],
  save(data: Pager): Pager
}


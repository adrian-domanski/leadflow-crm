export type LeadStatus = 'new' | 'contacted' | 'won';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  created_at?: string;
}

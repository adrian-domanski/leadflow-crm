export type LeadStatus = 'new' | 'contacted' | 'won';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  created_at?: string;
}

export type LeadsResponse = {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
};

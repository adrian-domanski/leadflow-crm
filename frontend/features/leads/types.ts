export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'won';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  company: string;
  created_at?: string;
}

export type LeadsResponse = {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
};

export type UpdateLeadDto = Partial<{
  name: string;
  company: string;
  status: LeadStatus;
}>;

export type CreateLeadDto = {
  name: string;
  email: string;
  company: string;
};

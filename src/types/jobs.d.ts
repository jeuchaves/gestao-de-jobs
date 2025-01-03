export interface IJobCreate {
  nDoc: string;
  title: string;
  project: string;
  status: string;
  jobSituation: string;
  deadline: string;
  responsibleId: number;
  typeDoc?: string;
}

export interface IJob {
  id: number;
  nDoc: string;
  title: string;
  project: string;
  status: string;
  jobSituation: string;
  typeDoc: string;
  deadline: string;
  responsibleId: number;
  estimatedComplexity: string | null;
  isChangeRequest: boolean;
  timeSheet: number;
  actualComplexity: string | null;
  contingencies: string | null;
  responsibleName: string;
  updated_at: string;
}

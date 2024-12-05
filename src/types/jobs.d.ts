export interface IJobCreate {
  nDoc: string;
  title: string;
  project: string;
  status: string;
  jobSituation: string;
  deadline: string;
  responsibleId: number;
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
  actualComplexity: number | string;
  contingencies: number | string;
  responsibleName: string;
}

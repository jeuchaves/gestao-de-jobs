import { useState } from "react";
import { UploadCsv } from "./steps/UploadCsv";
import { SelectResponsible } from "./steps/SelectResponsible";

export interface IStepsProps {
  handleNext: () => void;
  handleBack: () => void;
  saveData: (data: Partial<IJobData>[]) => void;
  getData: () => Partial<IJobData>[];
}

interface IJobData {
  nDoc: string;
  typeDoc: string;
  title: string;
  project: string;
  status: string;
  jobSituation: string;
  deadline: string;
  responsibleId: number;
}

export const AddJobs = () => {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<Partial<IJobData>[]>([]);

  const saveData = (data: Partial<IJobData>[]) => {
    setJobData((prev) => [...prev, ...data]);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onFinish = () => {
    console.log(jobData);
  };

  return (
    <>
      {step === 1 && <UploadCsv handleNext={onNext} saveData={saveData} />}
      {step === 2 && (
        <SelectResponsible
          handleNext={onFinish}
          handleBack={onBack}
          saveData={saveData}
          getData={() => jobData}
        />
      )}
    </>
  );
};

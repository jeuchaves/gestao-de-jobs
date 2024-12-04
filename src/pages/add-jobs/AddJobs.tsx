import { useState } from "react";
import { UploadCsv } from "./steps/UploadCsv";
import { SelectResponsible } from "./steps/SelectResponsible";
import { IJob } from "../../types/jobs";
import { JobsServices } from "../../services/api/jobs/JobsServices";
import { useNavigate } from "react-router-dom";

export interface IStepsProps {
  handleNext: () => void;
  handleBack: () => void;
  saveData: (data: Partial<IJob>[]) => void;
  getData: () => Partial<IJob>[];
}

export const AddJobs = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<Partial<IJob>[]>([]);

  const saveData = (data: Partial<IJob>[]) => {
    setJobData((prev) => [...prev, ...data]);
  };

  const onNext = () => setStep((prev) => prev + 1);
  const onBack = () => setStep((prev) => prev - 1);

  const onFinish = () => {
    JobsServices.createMany(jobData as IJob[]).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      window.alert("Jobs criados com sucesso");
      navigate("/");
    });
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

import { useState } from "react";
import { UploadCsv } from "./steps/UploadCsv";
import { SelectResponsible } from "./steps/SelectResponsible";
import { IJobCreate } from "../../../types/jobs";
import { useNavigate } from "react-router-dom";

export interface IStepsProps {
  handleNext: () => void;
  handleBack: () => void;
  saveData: (data: Partial<IJobCreate>[]) => void;
  getData: () => Partial<IJobCreate>[];
}

export const AddJobs = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<Partial<IJobCreate>[]>([]);

  const saveData = (data: Partial<IJobCreate>[]) => {
    setJobData((prev) => {
      const updatedData = [...prev];
      data.forEach((item, index) => {
        updatedData[index] = { ...updatedData[index], ...item };
      });
      return updatedData;
    });
  };

  const onNext = () => setStep((prev) => prev + 1);
  const onBack = () => setStep((prev) => prev - 1);

  const onFinish = () => {
    window.alert("Jobs criados com sucesso");
    navigate("/");
  };

  return (
    <>
      {step === 1 && <UploadCsv handleNext={onNext} saveData={saveData} />}
      {step === 2 && (
        <SelectResponsible
          handleNext={onFinish}
          handleBack={onBack}
          getData={() => jobData}
        />
      )}
    </>
  );
};

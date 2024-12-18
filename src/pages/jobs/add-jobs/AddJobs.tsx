import { useState } from "react";
import { UploadCsv } from "./steps/UploadCsv";
import { SelectResponsible } from "./steps/SelectResponsible";
import { IJobCreate } from "../../../types/jobs";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { TResultCreateMany } from "../../../services/api/jobs/JobsServices";
import { JobReview } from "./steps/JobReview";

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
  const [message, setMessage] = useState<{
    insertedIds: number[];
    duplicates: IJobCreate[];
  } | null>(null);

  const saveData = (data: Partial<IJobCreate>[]) => {
    setJobData((prev) => {
      const updatedData = [...prev];
      data.forEach((item, index) => {
        updatedData[index] = { ...updatedData[index], ...item };
      });
      return updatedData;
    });
  };

  const handleSaveMessage = (message: TResultCreateMany) => {
    setMessage(message);
  };

  const onNext = () => setStep((prev) => prev + 1);
  const onBack = () => setStep((prev) => prev - 1);

  const onFinish = () => {
    window.alert("Jobs criados com sucesso");
    navigate("/");
  };

  return (
    <BaseLayout>
      {step === 1 && <UploadCsv handleNext={onNext} saveData={saveData} />}
      {step === 2 && (
        <SelectResponsible
          handleNext={onNext}
          handleBack={onBack}
          getData={() => jobData}
          saveMessage={handleSaveMessage}
        />
      )}
      {step === 3 && message && (
        <JobReview getMessage={() => message} handleNext={onFinish} />
      )}
    </BaseLayout>
  );
};

import { useState } from "react";
import { UploadCsv } from "./steps/UploadCsv";

export interface IStepsProps {
  handleNext: () => void;
  handleBack: () => void;
}

export const AddJobs = () => {
  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <>{step === 1 && <UploadCsv handleNext={onNext} handleBack={onBack} />}</>
  );
};

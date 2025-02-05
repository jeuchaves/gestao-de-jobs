import { TaskAltOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { IJob } from "../../../types/jobs";
import { DialogFinishJob } from "../../../pages/jobs/index/components/DialogFinishJob";
import React, { useState } from "react";

interface IActCompleteJobProps {
  job: IJob;
  onClose?: () => void;
}

export const ActCompleteJob: React.FC<IActCompleteJobProps> = ({
  job,
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setSelectedJob(id);
    setOpen(true);
  };
  const handleClose = (update: boolean) => {
    setOpen(false);
    if (update && onClose) onClose();
  };

  return (
    <>
      <Tooltip title="Finalizar job" placement="top">
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            color: "primary.main",
          }}
        >
          <IconButton
            size="small"
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(job.id);
            }}
          >
            <TaskAltOutlined />
          </IconButton>
        </Avatar>
      </Tooltip>
      <DialogFinishJob open={open} onClose={handleClose} jobId={selectedJob} />
    </>
  );
};

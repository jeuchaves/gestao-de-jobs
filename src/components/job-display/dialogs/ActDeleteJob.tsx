import { DeleteOutlineRounded } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { DialogConfirmDelete } from "../../../pages/jobs/index/components/DialogConfirmDelete";
import { useState } from "react";
import { IJob } from "../../../types/jobs";

interface IActDeleteJobProps {
  job: IJob;
  onClose?: () => void;
}

export const ActDeleteJob: React.FC<IActDeleteJobProps> = ({
  job,
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const handleClose = (update: boolean) => {
    setOpen(false);
    if (update && onClose) onClose();
  };

  const handleOpen = (id: number) => {
    setSelectedJob(id);
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Excluir job" placement="top">
        <Avatar sx={{ bgcolor: "error.main", color: "white" }}>
          <IconButton
            size="small"
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(job.id);
            }}
          >
            <DeleteOutlineRounded />
          </IconButton>
        </Avatar>
      </Tooltip>
      <DialogConfirmDelete open={open} onClose={handleClose} id={selectedJob} />
    </>
  );
};

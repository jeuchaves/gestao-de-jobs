import { Avatar, IconButton, Tooltip } from "@mui/material";
import { IJob } from "../../../types/jobs";
import { ManageAccountsRounded } from "@mui/icons-material";
import { useState } from "react";
import { DialogUpdateResponsible } from "../../../pages/jobs/index/components/DialogUpdateResponsible";

interface IActUpdateResponsibleProps {
  job: IJob;
  onClose?: () => void;
}

export const ActUpdateResponsible: React.FC<IActUpdateResponsibleProps> = ({
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
      <Tooltip title="Alterar responsável" placement="top">
        <Avatar
          sx={{
            bgcolor: "primary.main",
            color: "white",
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
            <ManageAccountsRounded />
          </IconButton>
        </Avatar>
      </Tooltip>
      <DialogUpdateResponsible
        open={open}
        onClose={handleClose}
        id={selectedJob}
      />
    </>
  );
};

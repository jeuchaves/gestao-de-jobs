import { Avatar, IconButton, Tooltip } from "@mui/material";
import { IJob } from "../../../types/jobs";
import { ManageAccountsRounded } from "@mui/icons-material";
import { useState } from "react";
import { DialogUpdateResponsible } from "../../../pages/jobs/index/components/DialogUpdateResponsible";
import { IUser } from "../../../types/users";

interface IActUpdateResponsibleProps {
  job: IJob;
  onClose?: () => void;
  users: IUser[];
}

export const ActUpdateResponsible: React.FC<IActUpdateResponsibleProps> = ({
  job,
  onClose,
  users,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
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
              handleOpen();
            }}
          >
            <ManageAccountsRounded />
          </IconButton>
        </Avatar>
      </Tooltip>
      <DialogUpdateResponsible
        open={open}
        onClose={handleClose}
        job={job}
        users={users}
      />
    </>
  );
};

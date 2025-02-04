import { FC } from "react";
import { JobsServices } from "../../../../services/api/jobs/JobsServices";
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IUser } from "../../../../types/users";
import { blue } from "@mui/material/colors";
import { PersonRounded } from "@mui/icons-material";

interface IDialogUpdateResponsibleProps {
  id: number | null;
  open: boolean;
  onClose: (update: boolean) => void;
  users: IUser[];
}

export const DialogUpdateResponsible: FC<IDialogUpdateResponsibleProps> = ({
  id,
  open,
  onClose,
  users,
}) => {
  const handleUpdate = async (responsibleId: number) => {
    if (!id) {
      onClose(false);
      return;
    }

    JobsServices.updateResponsible(id, responsibleId).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      onClose(true);
    });
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Alterar responsável</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItem disablePadding key={user.id}>
            <ListItemButton onClick={() => handleUpdate(user.id)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonRounded />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.nomeCompleto} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

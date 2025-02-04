import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { IJob } from "../../../types/jobs";
import { ActDeleteJob } from "../dialogs/ActDeleteJob";
import { ActCompleteJob } from "../dialogs/ActCompleteJob";
import { ActUpdateResponsible } from "../dialogs/ActUpdateResponsible";
import React from "react";
import {
  convertMinutesToHoursAndMinutes,
  timeSinceDate,
} from "../../../utils/dateUtils";
import { format } from "date-fns";
import { IUser } from "../../../types/users";

export const ChipDueDate: React.FC<{
  job: IJob;
}> = ({ job }) => {
  const time = timeSinceDate(job.deadline);

  if (job.timeSheet > 0) {
    return (
      <Chip
        label={
          format(new Date(job.updated_at), "dd/MM/yyyy") +
          ` (${convertMinutesToHoursAndMinutes(job.timeSheet).hours}h${convertMinutesToHoursAndMinutes(job.timeSheet).minutes}m)`
        }
        size="small"
      />
    );
  }

  return (
    <Chip
      label={time.text ?? "Sem prazo"}
      size="small"
      color={time.isLate ? "error" : "default"}
    />
  );
};

interface IJobListProps {
  jobs: IJob[];
  users: IUser[];
  onChange?: () => void;
}

export const JobList: React.FC<IJobListProps> = ({ jobs, onChange, users }) => {
  return (
    <>
      <List>
        {jobs.map((job) => (
          <ListItem component={Paper} sx={{ my: 1 }} key={job.id}>
            <ListItemAvatar>
              <Avatar alt={job.responsibleName}>
                {job.responsibleName[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box>
                  <ChipDueDate job={job} />
                  <Typography>
                    {job.nDoc} - {job.title}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2">
                  {job.project}, por{" "}
                  <Typography
                    variant="inherit"
                    color="primary.light"
                    component="span"
                  >
                    {job.responsibleName ?? "Usuário"}
                  </Typography>
                </Typography>
              }
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              {job.timeSheet <= 0 && (
                <>
                  <ActUpdateResponsible
                    job={job}
                    onClose={onChange}
                    users={users}
                  />
                  <ActCompleteJob job={job} onClose={onChange} />
                </>
              )}
              <ActDeleteJob job={job} onClose={onChange} />
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

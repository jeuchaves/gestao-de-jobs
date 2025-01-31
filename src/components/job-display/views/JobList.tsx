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
import React, { useState } from "react";
import { DialogShowJob } from "../../../pages/jobs/index/components/DialogShowJob";
import { timeSinceDate } from "../../../utils/dateUtils";

interface IJobListProps {
  jobs: IJob[];
  onChange?: () => void;
}

export const ChipDueDate: React.FC<{ deadline: string }> = ({ deadline }) => {
  const time = timeSinceDate(deadline);
  return (
    <Chip
      label={time.text ?? "Sem prazo"}
      size="small"
      color={time.isLate ? "error" : "default"}
    />
  );
};

export const JobList: React.FC<IJobListProps> = ({ jobs, onChange }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelected] = useState<IJob | null>(null);

  const handleOpenDialog = (job: IJob) => {
    setSelected(job);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setSelected(null);
    setOpenDialog(false);
  };

  return (
    <>
      <List>
        {jobs.map((job) => (
          <ListItem
            component={Paper}
            sx={{ my: 1, cursor: "pointer" }}
            key={job.id}
            onClick={() => handleOpenDialog(job)}
          >
            <ListItemAvatar>
              <Avatar alt={job.responsibleName}>
                {job.responsibleName[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box>
                  <ChipDueDate deadline={job.deadline} />
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
                  <ActUpdateResponsible job={job} onClose={onChange} />
                  <ActCompleteJob job={job} onClose={onChange} />
                </>
              )}
              <ActDeleteJob job={job} onClose={onChange} />
            </Box>
          </ListItem>
        ))}
      </List>
      <DialogShowJob
        open={openDialog}
        onClose={handleCloseDialog}
        job={selectedJob}
      />
    </>
  );
};

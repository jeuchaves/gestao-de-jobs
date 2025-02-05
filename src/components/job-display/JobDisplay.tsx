import { FC } from "react";
import { IJob } from "../../types/jobs";
import { JobTable } from "./views/JobTable";
import { JobGrid } from "./views/JobGrid";
import { JobList } from "./views/JobList";
import { IUser } from "../../types/users";

interface IJobDisplayProps {
  jobs: IJob[];
  users: IUser[];
  view: "table" | "grid" | "list";
  onChange?: () => void;
}

export const JobDisplay: FC<IJobDisplayProps> = ({
  jobs,
  view,
  onChange,
  users,
}) => {
  switch (view) {
    case "table":
      return <JobTable jobs={jobs} />;
    case "grid":
      return <JobGrid jobs={jobs} />;
    case "list":
      return <JobList jobs={jobs} onChange={onChange} users={users} />;
    default:
      return <JobTable jobs={jobs} />;
  }
};

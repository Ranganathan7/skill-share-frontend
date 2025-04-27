import { TaskType } from "@/api-calls/task/get";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { AccountRoles, TaskStatus } from "@/lib/enums";
import { useAppSelector } from "@/lib/hooks/redux-toolkit";
import { InfoIcon } from "lucide-react";
import { AccountDetailsAlert } from "./AccountDetailsAlert";

export const TaskDetails = ({ task }: { task: TaskType }) => {
  const accountDetails = useAppSelector((state) => state.account);
  const statusColorMapping = {
    [TaskStatus.COMPLETED]: "bg-green-500",
    [TaskStatus.PENDING]: "bg-orange-500",
    [TaskStatus.IN_PROGRESS]: "bg-primary",
  };

  return (
    <Card className="w-100 h-80">
      <CardHeader>
        <CardTitle>
          <div className="flex w-full gap-8">
            <Label className="text-lg">{task.name}</Label>
            <Badge className={statusColorMapping[task.status]}>
              <Label className="text-xs">{task.status}</Label>
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2 text-sm font-thin">
        <div>
          <span className="font-normal">Category:</span> {task.category}
        </div>
        <div>
          <span className="font-normal">Expected Start Date:</span>{" "}
          {new Date(task.expectedStartDate).toLocaleDateString()}
        </div>
        <div>
          <span className="font-normal">Expected Working Hours:</span>{" "}
          {task.expectedWorkingHours} hours
        </div>
        <div>
          <span className="font-normal">Hourly Rate:</span> {task.hourlyRate}{" "}
          {task.rateCurrency}
        </div>
        {accountDetails.role === AccountRoles.PROVIDER && (
          <div className="flex w-full gap-4 items-center">
            <span>
              <span className="font-normal">Posted By:</span> {task.user.email}
            </span>
            <AccountDetailsAlert account={task.user} />
          </div>
        )}
        {accountDetails.role === AccountRoles.USER && task.provider && (
          <div className="flex w-full gap-4 items-center">
            <span>
              <span className="font-normal">Worked By:</span>{" "}
              {task.provider?.email}
            </span>
            <AccountDetailsAlert account={task.provider} />
          </div>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

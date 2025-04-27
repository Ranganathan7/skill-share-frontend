"use client";

import { useGetAccount } from "@/api-calls/account/get";
import { useLocalizedRedirect } from "@/lib/hooks/localized-redirect";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-toolkit";
import { clearAccountDetails, setAccountDetails } from "@/store/slices/account";
import { clearAuthorization } from "@/store/slices/headers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { authCookieKey } from "@/middleware";
import { useGetTasks } from "@/api-calls/task/get";
import { TaskCardSkeleton } from "@/components/skeleton/TaskSkeleton";
import { useDictionary } from "@/components/providers/LanguageProvider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AccountRoles } from "@/lib/enums";
import { TaskDetails } from "@/components/TaskDetails";

const page = () => {
  const getAccountMutation = useGetAccount();
  const accountDetails = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigation = useLocalizedRedirect();
  const router = useRouter();
  const t = useDictionary();
  const getTaskQuery = useGetTasks(accountDetails.id, {
    enabled: !!accountDetails.email,
  });
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const taskFetchLoading = getTaskQuery.isFetching || getTaskQuery.isLoading;

  useEffect(() => {
    if (!accountDetails.email) {
      getAccountMutation.mutate(
        {},
        {
          onSuccess: (res) => {
            dispatch(setAccountDetails(res.data.data));
          },
          onError: (err) => {
            toast.error(err.errorCode, {
              duration: 1500,
              description: err.description,
            });
            dispatch(clearAuthorization());
            dispatch(clearAccountDetails());
            Cookies.remove(authCookieKey);
            router.replace(navigation(""));
          },
        }
      );
    }
  }, []);

  const handleNoTaskActionClick = () => {
    if (accountDetails.role === AccountRoles.PROVIDER) {
      router.push(navigation("dashboard/explore"));
    } else {
      setShowAddTaskModal(true);
    }
  };

  return (
    <div className="h-full w-full">
      <Label className="text-xl">{t.labels.myTasks}</Label>
      <div className="flex flex-row space-x-4 overflow-x-auto overflow-y-auto w-full flex-wrap space-y-10 justify-evenly">
        {taskFetchLoading &&
          Array(6)
            .fill(true)
            .map((_, index) => <TaskCardSkeleton key={index} />)}
        {!taskFetchLoading && getTaskQuery.data?.data.data.length ? (
          getTaskQuery.data.data.data.map((task) => (
            <TaskDetails task={task} key={task.id} />
          ))
        ) : (
          <div className="flex flex-col gap-8 h-full w-full justify-center items-center text-center mt-40">
            <Label className="text-md">{t.messages.noTasksFound}</Label>
            <Button onClick={handleNoTaskActionClick}>
              {accountDetails.role === AccountRoles.PROVIDER
                ? t.actions.exploreTasks
                : t.actions.addTask}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

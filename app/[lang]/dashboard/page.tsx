"use client";

import { useGetAccount } from "@/api-calls/account/get";
import { useLocalizedRedirect } from "@/lib/hooks/localized-redirect";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-toolkit";
import { clearAccountDetails, setAccountDetails } from "@/store/slices/account";
import { clearAuthorization } from "@/store/slices/headers";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { authCookieKey } from "@/middleware";

const page = () => {
  const getAccountMutation = useGetAccount();
  const accountDetails = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigation = useLocalizedRedirect();
  const router = useRouter();

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

  return <div></div>;
};

export default page;

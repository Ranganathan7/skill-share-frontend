import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Account } from "@/api-calls/account/get";
import { InfoIcon } from "lucide-react";
import { Label } from "./ui/label";

export const AccountDetailsAlert = ({ account }: { account: Account }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <InfoIcon className="cursor-pointer h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Task worked by</AlertDialogTitle>
          <div className="flex flex-col space-y-2 mt-2">
            {/* Common Fields */}
            <KeyValue label="Email" value={account.email} />
            <KeyValue label="Type" value={account.type} />

            {/* Individual or Company */}
            {account.individualAccount && (
              <>
                <KeyValue
                  label="First Name"
                  value={account.individualAccount.firstName}
                />
                <KeyValue
                  label="Last Name"
                  value={account.individualAccount.lastName}
                />
                <KeyValue
                  label="Mobile Number"
                  value={account.individualAccount.mobileNumber}
                />
                {account.individualAccount.address && (
                  <>
                    <KeyValue
                      label="Street Number"
                      value={account.individualAccount.address.streetNumber}
                    />
                    <KeyValue
                      label="Street Name"
                      value={account.individualAccount.address.streetName}
                    />
                    <KeyValue
                      label="City"
                      value={account.individualAccount.address.city}
                    />
                    <KeyValue
                      label="State"
                      value={account.individualAccount.address.state}
                    />
                    <KeyValue
                      label="Post Code"
                      value={account.individualAccount.address.postCode}
                    />
                  </>
                )}
              </>
            )}

            {account.companyAccount && (
              <>
                <KeyValue
                  label="Company Name"
                  value={account.companyAccount.companyName}
                />
                <KeyValue
                  label="Representative First Name"
                  value={account.companyAccount.representativeFirstName}
                />
                <KeyValue
                  label="Representative Last Name"
                  value={account.companyAccount.representativeLastName}
                />
                <KeyValue
                  label="Phone Number"
                  value={account.companyAccount.phoneNumber}
                />
                <KeyValue
                  label="Business Tax Number"
                  value={account.companyAccount.businessTaxNumber}
                />
                {account.companyAccount.address && (
                  <>
                    <KeyValue
                      label="Street Number"
                      value={account.companyAccount.address.streetNumber}
                    />
                    <KeyValue
                      label="Street Name"
                      value={account.companyAccount.address.streetName}
                    />
                    <KeyValue
                      label="City"
                      value={account.companyAccount.address.city}
                    />
                    <KeyValue
                      label="State"
                      value={account.companyAccount.address.state}
                    />
                    <KeyValue
                      label="Post Code"
                      value={account.companyAccount.address.postCode}
                    />
                  </>
                )}
              </>
            )}
            {/* Skills Section */}
            {account.skills && account.skills.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-sm">Skills:</h4>
                <div className="flex flex-col gap-2">
                  {account.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-2 rounded-md border bg-muted"
                    >
                      <div className="text-xs">{skill.category}</div>
                      <div className="text-xs font-thin">
                        {skill.experience} years - {skill.natureOfWork} -{" "}
                        {skill.hourlyRate} {skill.rateCurrency} Hourly rate
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Helper Component
const KeyValue = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex justify-between">
    <Label className="font-medium text-sm">{label}:</Label>
    <Label className="text-sm font-thin">{value ?? "-"}</Label>
  </div>
);

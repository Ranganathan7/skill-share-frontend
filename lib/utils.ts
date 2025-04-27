import { Account } from "@/api-calls/account/get"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAccountName(account: Account) {
  if (account.companyAccount) {
    return account.companyAccount.companyName
  } else if (account.individualAccount) {
    return `${account.individualAccount.firstName} ${account.individualAccount.lastName}`
  } else {
    return ''
  }
}

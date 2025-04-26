import jwt from "jsonwebtoken";
import { AccountRoles, AccountType } from "./enums";

interface JwtPayload {
  id: number;
  role: AccountRoles;
  type: AccountType;
}

export async function getUserFromToken(token: string) {
  try {
    const payload = jwt.decode(token) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
}

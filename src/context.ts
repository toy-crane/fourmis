import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { User } from "./gql/User/user/user";
import getUser from "./utils/auth/getUser";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user: User;
}
export const createContext = async (
  req: Request,
  res: Response
): Promise<Context> => {
  return { prisma, req, res, user: await getUser(req, res) };
};

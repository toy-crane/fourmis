import { authenticateJWT } from "../../passport/jwt";
import { Request, Response } from "express";
import { User } from "../../gql/User/user/user";

export default async (req: Request, res: Response): Promise<User> => {
  try {
    return await authenticateJWT(req, res);
  } catch (e) {
    new Error(e);
  }
};

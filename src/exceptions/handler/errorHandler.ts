import { Request, Response, NextFunction } from "express";

import { EErrorCodes } from "../../types/errors";
import { ErrorException } from "..";
import { ErrorStruct } from "../struct";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error Handler]: Path: ${req.path}, Exception: ${err.stack}`);
  if (err instanceof ErrorException) {
    res.status(err.status as number).send(err);
  } else {
    res
      .status(500)
      .send({ code: EErrorCodes.InternalError, status: 500 } as ErrorStruct);
  }
};

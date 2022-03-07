import { EErrorCodes } from "../types/errors";

type IStatusCode = {
  [key in EErrorCodes]: number;
}

const StatusCodes: IStatusCode = {
    NotFound : 404,
    InternalError : 500,
    Forbidden : 403,
    Conflicts : 409,
}

export class ErrorException extends Error {
  public status: number | undefined = undefined;
  public metaData: any = null;
  constructor(
    code: EErrorCodes = EErrorCodes.InternalError,
    metaData: any = null
  ) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = StatusCodes[code];
    this.metaData = metaData;
  }
}

type IExceptions = {
  [key in EErrorCodes]: (metaData?: any) => ErrorException;
};

export let exceptions: IExceptions;

export const setupExceptions = (): void => {
  let list: IExceptions = {} as IExceptions;

  for (const exception of Object.values(EErrorCodes)) {
    list[exception] = (metaData: any) => new ErrorException(exception, metaData);
  }

  exceptions = list;
};

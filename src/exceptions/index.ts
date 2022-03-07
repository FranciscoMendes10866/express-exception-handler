import { EErrorCodes } from "../types/errors";

export class ErrorException extends Error {
  public status: number | undefined = undefined;
  public metaData: any = null;
  constructor(
    code: EErrorCodes = EErrorCodes.UnknownError,
    metaData: any = null
  ) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = EErrorCodes.UnknownError;
    this.status = 500;
    this.metaData = metaData;
    switch (code) {
      case EErrorCodes.Unauthenticated:
        this.status = 401;
        break;
      case EErrorCodes.MaximumAllowedGrade:
        this.status = 400;
        break;
      case EErrorCodes.AsyncError:
        this.status = 400;
        break;
      case EErrorCodes.NotFound:
        this.status = 404;
        break;
      case EErrorCodes.Forbidden:
        this.status = 409;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}

type IExceptions = {
  [key in EErrorCodes]: (metaData?: any) => ErrorException;
};

export let exceptions: IExceptions;

export const setupExceptions = () => {
  let list: IExceptions = {} as IExceptions;

  for (const exception of Object.values(EErrorCodes)) {
    list[exception] = (metaData: any) => new ErrorException(exception, metaData);
  }

  exceptions = list;
};

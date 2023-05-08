import { NextFunction, Request, Response } from "express";

interface IMeta {
  page: number | undefined;
  pageSize: number | undefined;
  skip: number | undefined;
}

const postPagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const meta: IMeta = {
    page: 1,
    skip: 0,
    pageSize: 100,
  };

  if (Boolean(req?.query?.page) && Number(req?.query.page)) {
    meta.page = Number(req?.query?.page);
    if (meta.page && meta.page !== 0) {
      meta.pageSize = 5;
      meta.skip = (meta.page - 1) * meta.pageSize;
    } else {
      res.status(400).send("error");
    }
  } else {
    meta.page = 1;
    meta.skip = 0;
    meta.pageSize = 100;
  }

  res.locals.meta = meta;
  next();
};

export { postPagination };

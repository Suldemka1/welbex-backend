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
  try {
    const meta: IMeta = {
      page: 1,
      skip: 0,
      pageSize: 100,
    };
    if (Number(req.query.page) > 0) {
      meta.page = Number(req.query.page);
      console.log("this is");
      console.log(meta.page);
      meta.pageSize = 5;
      meta.skip = (meta.page - 1) * meta.pageSize;
    } else {
      throw 'param "page" cannot be less than 1';
    }
    res.locals.meta = meta;
    next();
  } catch (e) {
    res.sendStatus(400);
  }
};

export { postPagination };

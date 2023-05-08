import { isString } from "class-validator";
import { DatabaseService } from "../../database";
import * as express from "express";
import { extname } from "path";
import { PostCreationDto } from "./dto";

class PostService {
  constructor(private databaseService: DatabaseService) {}

  private fileCreation = (files: Express.Multer.File[]) => {
    const data = files.map((item: Express.Multer.File) => {
      return {
        type: item.mimetype,
        filename: item.filename,
        url: item.path,
        ext: extname(item.filename),
      };
    });
    return data;
  };

  async create(dto: PostCreationDto): Promise<boolean> {
    const filesCreate = this.fileCreation(dto.data.files);

    if (isString(dto.data.message)) {
      await this.databaseService.post
        .create({
          data: {
            message: dto.data.message,
            userId: dto.id,
            media: {
              create: filesCreate,
            },
          },
        })
        .catch((e) => {
          return false;
        });

      return true;
    } else {
      return false;
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    const records = await this.databaseService.post.count();
    const data = await this.databaseService.post
      .findMany({
        include: {
          media: true,
        },
        take: res.locals.meta.pageSize || 100,
        skip: res.locals.meta.skip || 0,
      })
      .then((posts) => {
        let pageCount: number | undefined;
        // костыль, просто опаздываю
        (() => {
          if (
            records % res?.locals?.meta?.pageSize > 0 &&
            res?.locals?.meta?.pageSize
          ) {
            pageCount = ~~(records / res.locals.meta.pageSize) + 1;
            return pageCount;
          } else if (res.locals.meta.pageSize === undefined) {
            pageCount = 20;
            return pageCount;
          } else {
            pageCount = records / res.locals.meta.pageSize;
            return pageCount;
          }
        })();
        // не все успеваю типизировать
        return {
          data: [...posts],
          meta: {
            page: res.locals.meta.page,
            pageSize: res.locals.meta.pageSize,
            pageCount: pageCount,
            total: records,
          },
        };
      });
    return data;
  }

  async deleteOne(id: any) {
    const data = await this.databaseService.post.delete({
      where: {
        id: Number(id),
      },
    });

    return data;
  }

  async patch(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const { message } = req.body;
    const files = req.files as Express.Multer.File[];
    const filesCreate = this.fileCreation(files);

    if (message) {
      const data = await this.databaseService.post.update({
        where: {
          id: Number(id),
        },
        data: {
          media: {
            deleteMany: {},
            create: filesCreate,
          },
          message: req.body.message,
        },
      });
      return data;
    } else {
      return false;
    }
  }
}

export { PostService };

import { DatabaseService } from "../..//database";
import { extname } from "path";

class FileService {
  constructor(private databaseService: DatabaseService) {}

  async create(dto: Express.Multer.File, postId: number) {
    const res = await this.databaseService.media.create({
      data: {
        type: String(dto.mimetype),
        filename: String(dto.filename),
        url: String(dto.destination),
        ext: String(extname(dto.filename)),
        postId: postId,
      },
    });
    return res;
  }
}

export { FileService };

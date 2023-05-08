export class PostCreationDto {
  id: number;
  data: {
    message: string;
    files: Express.Multer.File[];
  };
}

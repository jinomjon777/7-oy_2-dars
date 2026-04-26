import { CreateArticleImageDto } from "./create-article_image.dto";

// Keep DTO only for articleId; files are handled by multer and not validated by class-validator
export class CreateImageDto extends CreateArticleImageDto {}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { ArticleImageService } from './article_image.service';
import { CreateArticleImageDto } from './dto/create-article_image.dto';
import { UpdateArticleImageDto } from './dto/update-article_image.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesUser } from 'src/shared/enums/roles.enum';
import { Roles } from 'src/common/decarators/roles.decarator';
import { CreateArticleFileDto } from '../article/dto/article-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { CreateImageDto } from './dto/create_image.dto';

@ApiBearerAuth("JWT-auth")
@ApiInternalServerErrorResponse({description: "Internal server error"})
@Controller('article-image')
export class ArticleImageController {
  constructor(private readonly articleImageService: ArticleImageService) {}

  @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUser.ADMIN, RolesUser.SUPERADMIN, RolesUser.USER)
    @Post()
    @ApiOperation({ summary: 'Yangi maqola yaratish' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          articleId: { type: 'number', example: 1 },
          files: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
          },
        },
      },
    })
    @ApiResponse({ status: 201, description: 'Maqola muvaffaqiyatli yaratildi', type: CreateArticleDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
      FilesInterceptor('files', 10, {
        storage: diskStorage({
          destination: path.join(process.cwd(), 'uploads'),
          filename: (req, file, cb) => {
            const uniqueSuffix = `${file.originalname}${Date.now()}`;
            const ext = path.extname(file.originalname);
  
            // FIX: % emas $
            cb(null, `${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
  create(@Body() createArticleImageDto: CreateImageDto, @UploadedFiles() files: Express.Multer.File[]) {
    if (!Array.isArray(files) || files.length === 0) {
      throw new BadRequestException('files must be an array');
    }
    return this.articleImageService.create(createArticleImageDto, files);
  }

  @Get()
  findAll() {
    return this.articleImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleImageDto: UpdateArticleImageDto) {
    return this.articleImageService.update(+id, updateArticleImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleImageService.remove(+id);
  }
}

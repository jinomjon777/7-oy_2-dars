import {Controller,Get,Post,Body,Patch,Param,Delete,UseInterceptors,UploadedFile,Req, UseGuards, Query,} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiConsumes, ApiBearerAuth, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { CreateArticleFileDto } from './dto/article-file.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesUser } from 'src/shared/enums/roles.enum';
import { Roles } from 'src/common/decarators/roles.decarator';
import { QueryDto } from './dto/query.dto';

@ApiBearerAuth("JWT-auth")
@ApiInternalServerErrorResponse({description: "Internal server error"})
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesUser.ADMIN, RolesUser.SUPERADMIN, RolesUser.USER)
  @Post()
  @ApiOperation({ summary: 'Yangi maqola yaratish' })
  @ApiBody({ type: CreateArticleFileDto })
  @ApiResponse({ status: 201, description: 'Maqola muvaffaqiyatli yaratildi', type: CreateArticleDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
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
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return this.articleService.create(createArticleDto, file, req.user.id);
  }

  @Get()
  findAll(@Query() queryDto: QueryDto) {
    return this.articleService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Roles(RolesUser.ADMIN, RolesUser.SUPERADMIN, RolesUser.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Roles(RolesUser.ADMIN, RolesUser.SUPERADMIN, RolesUser.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
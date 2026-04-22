import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi maqola yaratish' })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({ status: 201, description: 'Maqola muvaffaqiyatli yaratildi', type: CreateArticleDto })
  @ApiResponse({ status: 400, description: 'Ma\'lumotlar noto\'g\'ri' })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha maqolalarni olish' })
  @ApiResponse({ status: 200, description: 'Maqolalar ro\'yxati' })
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo\'yicha maqolani olish' })
  @ApiParam({ name: 'id', example: 1, description: 'Maqola ID si' })
  @ApiResponse({ status: 200, description: 'Maqola topildi' })
  @ApiResponse({ status: 404, description: 'Maqola topilmadi' })
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Maqolani yangilash' })
  @ApiParam({ name: 'id', example: 1, description: 'Maqola ID si' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli yangilandi', schema: { example: { message: 'Updated' } } })
  @ApiResponse({ status: 404, description: 'Maqola topilmadi' })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Maqolani o\'chirish' })
  @ApiParam({ name: 'id', example: 1, description: 'Maqola ID si' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli o\'chirildi', schema: { example: { message: 'Deleted' } } })
  @ApiResponse({ status: 404, description: 'Maqola topilmadi' })
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}

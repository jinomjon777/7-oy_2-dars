import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(Tag) private tagRepo:Repository<Tag>
  ) {}

  async create(createArticleDto: CreateArticleDto, file: Express.Multer.File, userId) {

    const foundedTags = await this.tagRepo.findBy({id: In(createArticleDto.tags)})

    if(!foundedTags) throw new BadRequestException()
    const article = this.articleRepo.create({
      ...createArticleDto,
      author: userId,
      tags: foundedTags
    });

    article.backroundImege = `http://localhost:4001/uploads/${file.filename}`;

    return await this.articleRepo.save(article);
  }
  
  async findAll(): Promise<Article[]> {
    return await this.articleRepo.find();
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepo.findOne({ 
      where: { id },  
      relations: ["author", "tags"]
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<{ message: string }> {
  const article = await this.articleRepo.findOne({
    where: { id },
    relations: ['tags'],
  });

  if (!article) throw new NotFoundException('Article not found');

  if(updateArticleDto.title !== undefined){
    article.title = updateArticleDto.title
  }

  if(updateArticleDto.content !== undefined){
    article.content = updateArticleDto.content
  }

  if(updateArticleDto.tags){
    const tags = await this.tagRepo.findBy({
      id: In(updateArticleDto.tags)
    })

    if(tags.length !== updateArticleDto.tags?.length){
      throw new BadRequestException("Some tags not found")
    }

    article.tags = tags
  }

  await this.articleRepo.save(article);

  return { message: 'Updated' };
}

  async remove(id: number): Promise<{ message: string }> {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    await this.articleRepo.softDelete({ id });
    return { message: 'Deleted' };
  }
}
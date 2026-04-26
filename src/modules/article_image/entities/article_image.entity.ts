import { BaseEntity } from "src/database/entities/base.entity";
import { Article } from "src/modules/article/entities/article.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "article_image"})
export class ArticleImage extends BaseEntity {
  @Column({type: "varchar", length: 500})
  url!: string

  @Column({type: "integer"})   
  sortorder!: number;  



  @ManyToOne(()=> Article, (article)=> article.images)   
  article!: Article

  @OneToMany(()=> ArticleImage, (article_image)=> article_image.article)
  @JoinColumn({name: "article_id"})
  images?: ArticleImage[]
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Document } from 'mongoose';

import { IsNs } from 'src/common/validate';
import { SortFields } from 'src/lib/sort';
import { helper, MongoEntity } from 'src/mongo';

@Schema()
@SortFields(['key', 'name'])
export class NamespaceDoc {
  /**
   * 额外数据
   */
  @IsOptional()
  @IsString()
  @Prop()
  data?: string;

  /**
   * 描述
   */
  @IsOptional()
  @IsString()
  @Prop()
  desc?: string;

  /**
   * 标签
   */
  @IsOptional()
  @IsString({ each: true })
  @Prop({ type: [String] })
  labels?: string[];

  /**
   * 名称
   */
  @IsNotEmpty()
  @IsString()
  @Prop()
  name: string;

  /**
   * 命名空间的 key
   *
   * 允许的字符 ^[a-zA-Z][a-zA-Z0-9._/-]{0,30}$
   */
  @IsNotEmpty()
  @IsNs()
  @Prop({ unique: true })
  key: string;

  /**
   * 所属的 namespace
   */
  @IsOptional()
  @IsNs()
  @Prop()
  ns?: string;
}

export const NamespaceSchema = helper(SchemaFactory.createForClass(NamespaceDoc));
export class Namespace extends IntersectionType(NamespaceDoc, MongoEntity) {}
export type NamespaceDocument = Namespace & Document;

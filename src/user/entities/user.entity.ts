import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsIP,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Document } from 'mongoose';

import { IsPassword, IsUsername } from 'src/common/validate';
import { helper, MongoEntity } from 'src/mongo';

@Schema()
export class UserDoc {
  /**
   * 头像
   */
  @IsOptional()
  @IsString()
  @Prop()
  avatar?: string;

  /**
   * 额外数据
   */
  @IsOptional()
  @IsString()
  @Prop()
  data?: string;

  /**
   * 邮箱
   */
  @IsOptional()
  @IsString()
  @IsEmail()
  @Prop({ unique: true, sparse: true })
  email?: string;

  /**
   * 姓名
   */
  @IsOptional()
  @IsString()
  @Prop()
  name?: string;

  /*
   * 身份证
   */
  @IsOptional()
  @Prop()
  identity?: string;

  /**
   * 实名认证时间
   */
  @IsOptional()
  @IsDate()
  @Prop()
  identityVerifiedAt?: Date;

  /**
   * 实名认证是否通过
   */
  @IsOptional()
  @IsBoolean()
  @Prop()
  identityVerified?: boolean;

  /**
   * 简介
   */
  @IsOptional()
  @IsString()
  @Prop()
  intro?: string;

  /**
   * 使用语言
   */
  @IsOptional()
  @IsString()
  @Prop()
  language?: string;

  /**
   * 最后登录 IP
   */
  @IsOptional()
  @IsIP()
  @Prop()
  lastLoginIp?: string;

  /**
   * 最后活跃时间
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Prop()
  lastSeenAt?: Date;

  /**
   * 昵称
   */
  @IsOptional()
  @IsString()
  @Prop()
  nickname?: string;

  /**
   * 所属命名空间
   */
  @IsNotEmpty()
  @IsString()
  @Prop()
  ns?: string;

  /**
   * 密码
   */
  @IsOptional()
  @IsPassword()
  @ApiProperty({ type: String, writeOnly: true })
  @Prop({ hideJSON: true })
  password?: string;

  /**
   * 手机号
   */
  @IsOptional()
  @IsString()
  @IsMobilePhone('zh-CN') // 中国大陆地区手机号
  @Prop({ unique: true, sparse: true })
  phone?: string;

  /**
   * 注册 IP
   */
  @IsOptional()
  @IsIP()
  @Prop()
  registerIp?: string;

  /**
   * 注册地区，存地区编号
   */
  @IsOptional()
  @IsString()
  @Prop()
  registerRegion?: string;

  /**
   * 角色
   */
  @IsOptional()
  @IsString({ each: true })
  @Prop()
  roles?: string[];

  /**
   * 是否超级管理员
   */
  @IsOptional()
  @IsBoolean()
  @Prop()
  super?: boolean;

  /**
   * 用户名
   */
  @IsOptional()
  @IsString()
  @IsUsername()
  @Prop({ unique: true, sparse: true })
  username?: string;
}

export const UserSchema = helper(SchemaFactory.createForClass(UserDoc));
export class User extends IntersectionType(UserDoc, MongoEntity) {}
export type UserDocument = User & Document;

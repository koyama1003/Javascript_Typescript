import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsString()
  name_kana!: string;
  @IsNotEmpty()
  @IsString()
  name_roma!: string;
  @IsNotEmpty()
  @IsString()
  display_name!: string;
  @IsNotEmpty()
  @IsString()
  phone!: string;
  birthday?: Date;
  gender?: string;
  employment_status?: string;
  memo?: string;
  job_type?: string;
}

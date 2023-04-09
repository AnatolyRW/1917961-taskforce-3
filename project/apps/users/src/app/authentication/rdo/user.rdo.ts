import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export class UserRdo {
    @ApiProperty({
      description: 'The uniq user ID',
      example: '13'
    })
    @Expose({name: '_id'})
    public id: string;

    @ApiProperty({
      description: 'User name',
      example: 'Robert'
    })
    @Expose()
    public name: string;

    @ApiProperty({
      description: 'User email',
      example: 'user@user.local'
    })    
    @Expose()
    public email: string;

    @ApiProperty({
      description: 'City',
      example: 'Moscow',
    })
    @Expose()
    public city: string;

    @ApiProperty({
      description: 'User role Customer or Contractor',
      example: 'Customer',
    })
    @Expose()
    public role: UserRole;

    @ApiProperty({
      description: 'User avatar path',
      example: '/images/user.jpg'
    })
    @Expose()
    public avatar: string;

    @ApiProperty({
      description: 'User date birth (ISO format)',
      example: '1981-03-12'
    })
    @Expose()
    public dateBirth: Date;
}
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@project/shared/app-types";

export class CreateUserDto {
    @ApiProperty({
      description: 'User name',
      example: 'Robert'
    })
    public name: string;

    @ApiProperty({
      description: 'User unique address',
      example: 'user@user.ru'
    })
    public email: string;

    @ApiProperty({
      description: 'City',
      example: 'Moscow'
    })
    public city: string;

    @ApiProperty({
      description: 'User password',
      example: '123456'
    })
    public password: string;

    @ApiProperty({
      description: 'User role Customer or Contractor',
      example: 'Customer'
    })
    public role: UserRole;

    @ApiProperty({
      description: 'User avatar path',
      example: '/images/user.jpg'
    })
    public avatar: string;

    @ApiProperty({
      description: 'User birth date',
      example: '1981-03-12'
    })
    public dateBirth: Date;
}
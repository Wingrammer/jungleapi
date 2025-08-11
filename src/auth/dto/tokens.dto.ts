import { ApiProperty } from "@nestjs/swagger";

// src/auth/dto/tokens.dto.ts
export class TokensDto {
  @ApiProperty({ description: 'JWT Access Token' })
  access_token: string;

  @ApiProperty({ description: 'JWT Refresh Token' })
  refresh_token: string;
}
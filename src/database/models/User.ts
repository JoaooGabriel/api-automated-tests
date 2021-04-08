import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

class User {
  @IsUUID()
  id: string;
  
  @IsString()
  @MinLength(3, {message: "Name must contain a minimum of 3 characters"})
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @MinLength(6, {message: "Password must contain a minimum of 3 characters"})
  @IsNotEmpty()
  password: string;
}

export { User };

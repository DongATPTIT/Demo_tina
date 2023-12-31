import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "src/databases/entity/user.enity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";


@Module({
    controllers: [UserController],
    providers: [UserService, UserEntity],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [UserService]
})
export class UserModule { }
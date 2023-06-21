import { AuthModule } from "@modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controllers/user.controller";
import { AdminEntity } from "./database/entities/admin.entity";
import { EmployeeEntity } from "./database/entities/employee.entity";
import { UserEntity } from "./database/entities/user.entity";
import { EmployeeRepository } from "./database/repositories/employee.dto";
import { UserRepository } from "./database/repositories/user.repository";
import { EmployeeService } from "./services/employee.service";
import { UserService } from "./services/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, AdminEntity, EmployeeEntity]),
        AuthModule
    ],
    controllers: [UserController],
    providers: [
        {
            provide: 'IUserRepository',
            useClass: UserRepository
        },
        {
            provide: 'IUserService',
            useClass: UserService
        },
        {
            provide: 'IEmployeeRepository',
            useClass: EmployeeRepository
        },
        {
            provide: 'IEmployeeService',
            useClass: EmployeeService
        }
    ],
    exports: [
        'IUserRepository',
        'IUserService',
        'IEmployeeRepository',
        'IEmployeeService'
    ]
})
export class ClientModule {}
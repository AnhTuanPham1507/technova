import { AuthModule } from "@modules/auth/auth.module";
import { ImageModule } from "@modules/images/image.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SolutionController } from "./controllers/solution.controller";
import { SolutionEntity } from "./database/entities/solution.entity";
import { SolutionRepository } from "./database/repositories/solution.repository";
import { SolutionService } from "./services/solution.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            SolutionEntity
        ]),
        AuthModule,
        ImageModule
    ],
    controllers: [SolutionController],
    providers: [
        {
            provide: 'ISolutionRepository',
            useClass: SolutionRepository
        },
        {
            provide: 'ISolutionService',
            useClass: SolutionService
        }
    ],
    exports: [
        'ISolutionRepository',
        'ISolutionService'
    ]
})
export class SolutionModule {}
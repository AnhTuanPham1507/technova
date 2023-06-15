import { ImageModule } from "@modules/images/image.module";
import { Module } from "@nestjs/common";
import { CronjobService } from "./services/cronjob.service";

@Module({
    imports: [
        ImageModule
    ],
    providers: [
        {
            provide: 'ICronjobService',
            useClass: CronjobService
        }
    ],
    exports: [
        'ICronjobService'
    ]
})
export class CronjobModule {}

import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { Controller, Get, HttpStatus, Inject, Query } from "@nestjs/common";
import { ApiBearerAuth,  ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { NotificationDTO } from "../dtos/responses/notification.dto";
import { INotificationService } from "../services/notification.service";


@Controller('/v1/notification')
@ApiTags('Notification')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class NotificationController {
  constructor(
    @Inject('INotificationService')
    private readonly notificationService: INotificationService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: NotificationDTO,
    isArray: true,
    description: 'Got list notification successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getNotificationList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<NotificationDTO>> {
    return this.notificationService.getAll(pageOptionsDTO);
  }

}

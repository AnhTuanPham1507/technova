
import { PageDTO } from "@common/dtos/responses/page.dto";
import { RoleEnum } from "@constants/enums/role.enum";
import { Roles } from "@decorators/role.decorator";
import { AuthGuard } from "@modules/auth/guards/auth.guard";
import { RolesGuard } from "@modules/auth/guards/role.guard";
import { Controller, Get, HttpStatus, Inject, Param, Patch, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth,  ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { request } from "express";
import { NotificationPageOptionsDTO } from "../dtos/requests/notitication-page-options.dto";
import { NotificationDTO } from "../dtos/responses/notification.dto";
import { INotificationService } from "../services/notification.service";


@Controller('/v1/notification')
@ApiTags('Notification')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
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
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  getNotificationList(
    @Query() pageOptionsDTO: NotificationPageOptionsDTO
  ): Promise<PageDTO<NotificationDTO>> {
    return this.notificationService.getAll(pageOptionsDTO);
  }

  @Get('owner')
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
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE, RoleEnum.USER)
  getOwnerNotifications(
    @Query() pageOptionsDTO: NotificationPageOptionsDTO,
    @Request() req
  ): Promise<PageDTO<NotificationDTO>> {
    return this.notificationService.getByOwner(pageOptionsDTO,req.user);
  }

  @Patch(':id')
  @ApiOkResponse({})
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE, RoleEnum.USER)
  update(
    @Param('id') id: string,
    @Request() req
  ): Promise<NotificationDTO> {
    return this.notificationService.update(id, req.user);
  }

}

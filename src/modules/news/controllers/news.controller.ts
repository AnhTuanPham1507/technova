
import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateNewsDTO } from "../dtos/requests/create-news.dto";
import { UpdateNewsDTO } from "../dtos/requests/update-news.dto";
import { NewsDTO } from "../dtos/responses/news.dto";
import { INewsService } from "../services/news.service";


@Controller('/v1/news')
@ApiTags('News')
@ApiBearerAuth()
// @UseGuards(OtableAuthGuard)
// @Roles(RoleType.ADMIN, RoleType.USER)
export class NewsController {
  constructor(
    @Inject('INewsService')
    private readonly newsService: INewsService,
  ) {}

  @Get('')
  @ApiOkResponse({
    type: NewsDTO,
    isArray: true,
    description: 'Got list news successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  getNewsList(
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<NewsDTO>> {
    return this.newsService.getAll(pageOptionsDTO);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: NewsDTO,
    description: 'Got news successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'News with id ... can`t be found'
  })
  getNews(
    @Param('id') id: string,
  ): Promise<NewsDTO> {
    return this.newsService.getById(id);
  }

  @Post('')
  @ApiBody({ type: CreateNewsDTO })
  @ApiOkResponse({
    type: NewsDTO,
    description: 'Create news successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createNews(
    @Body() body: CreateNewsDTO,
  ): Promise<NewsDTO> {
    console.log(body)
    return this.newsService.create(body, 'test');
  }

  @Put('/:id')
  @ApiBody({ type: UpdateNewsDTO })
  @ApiOkResponse({
    type: NewsDTO,
    description: 'Update news successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'News with id ... can`t be found'
  })
  updateNews(
    @Param('id') id: string,
    @Body() body: UpdateNewsDTO,
  ): Promise<NewsDTO> {
    return this.newsService.update(id, body, 'test');
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete news successfully',
    type: NewsDTO
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  @ApiNotFoundResponse({
    description: 'News with id ... can`t be found'
  })
  deleteNews(
    @Param('id') id: string,
  ): Promise<NewsDTO> {
    return this.newsService.delete(id, 'test');
  }
}

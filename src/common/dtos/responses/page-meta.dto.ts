import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDTO } from '../requests/page-options.dto';


export interface IPageMetaDtoParameters {
  pageOptionsDTO: PageOptionsDTO;
  itemCount: number;
}

export class PageMetaDTO {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDTO, itemCount }: IPageMetaDtoParameters) {
    this.page = pageOptionsDTO.page;
    this.take = pageOptionsDTO.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

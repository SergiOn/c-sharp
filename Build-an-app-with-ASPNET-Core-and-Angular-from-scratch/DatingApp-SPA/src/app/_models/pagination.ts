export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {

  constructor(
    public result: T,
    public pagination: Pagination
  ) {
  }

}

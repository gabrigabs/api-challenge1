import Pagination from '../interfaces/paginationInterface';

const paginate = async (data: any): Promise<Pagination> => {
  let { pages } = data;
  if (parseInt(data.filter.take, 10) === data.total) {
    pages = 1;
  }
  if (parseInt(data.filter.take, 10) === parseInt(data.page, 10)) {
    pages -= 1;
  }
  return {
    docs: data.docs,
    limit: parseInt(data.filter.take, 10),
    page: parseInt(data.page, 10),
    pages: parseInt(pages, 10),
    totalDocs: data.total,

  };
};

export default paginate;

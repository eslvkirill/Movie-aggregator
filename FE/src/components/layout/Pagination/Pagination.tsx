import './Pagination.scss';

const Pagination = ( { totalPages, paginate, currentPage }: any ) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="paginate">
      {pageNumbers.length > 1
        ? pageNumbers.map((number: number) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={number}
              onClick={() => paginate(number)}
              className="link"
              style={
                currentPage === number
                  ? {
                      backgroundColor: '#a5101052',
                      color: '#f7d9a8',
                      transform: 'scale(1.05)',
                    }
                  : {}
              }
            >
              {number}
            </li>
          ))
        : ''}
    </ul>
  );
};

export default Pagination;

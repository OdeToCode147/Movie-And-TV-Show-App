import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const MyPagination = ({ totalPages, setPage1 }) => {
  let pages
  if (totalPages && totalPages > 500) {
    pages = 500;
  } else {
    pages = totalPages;
  }
  
  const handlePageClick = (data) => {
    setPage1(data.selected + 1);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <ReactPaginate
        initialPage={0}
        previousLabel={"< Previous"}
        breakLabel={"..."}
        nextLabel={"Next >"}
        // renderOnZeroPageCount={null}
        pageCount={pages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default MyPagination;

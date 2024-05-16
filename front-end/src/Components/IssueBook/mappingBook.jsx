function MapOnIssuedBook({ books }) {
  let count = 0;

  return (
    <>
      {books?.map(
        (book, index) =>
          book.issuedBook && (
            <tr key={index}>
              <td>{++count}</td>
              <td>{book.bookName}</td>
              <td>{book.bookCategory}</td>
              <td>{book.issueDate.substring(0, 10)}</td>
              <td>{book.returnDate.substring(0, 10)}</td>
            </tr>
          )
      )}
    </>
  );
}

export default MapOnIssuedBook;

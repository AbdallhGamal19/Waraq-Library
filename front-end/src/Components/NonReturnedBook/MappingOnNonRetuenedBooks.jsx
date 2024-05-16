import { useDispatch } from "react-redux";
import { fetchData } from "../../Redux/slice/requestSlice.js";
function MappingOnNonRetuenedBooks({ books }) {
  const dispatch = useDispatch();
  let count = 0;
  return (
    <>
      {books?.map(
        (book, index) =>
          book.issuedBook && (
            <tr key={index}>
              <td>{++count}</td>
              <td>{book.bookName}</td>
              <td>{book.late}</td>
              <td>{book.returnDate?.substring(0, 10)}</td>
              <td>{book.fine}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch(
                      fetchData({
                        formData: { id: book._id },
                        endPoint: "book/returnedBook",
                        method: "post",
                      })
                    )
                  }
                  className="btn btn-secondary  "
                >
                  Return
                </button>
              </td>
            </tr>
          )
      )}
    </>
  );
}

export default MappingOnNonRetuenedBooks;

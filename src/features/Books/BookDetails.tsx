import { useEffect, useState } from "react";
import { ApiService } from "services";
import { Grid } from "shared/components/grid";
import { Loader } from "shared/components/loader";

interface BookDetails {
  id: number;
  bookTitle: string;
  authorName: string;
  publisherName: string;
  bookPrice: number;
  bookCategory: number;
}

export default function BookDetails() {
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState<BookDetails[]>([]);

  useEffect(() => {
    ApiService.get<BookDetails[]>("books")
      .then((data) => setBookDetails(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    // <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <>
    //       <h1 className="text-3xl font-bold mb-6 text-gray-800">
    //         Library Books
    //       </h1>

    //       <div className="w-full max-w-5xl overflow-x-auto">
    //         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
    //           <thead className="bg-gradient-to-r from-black to-indigo-600 text-white">
    //             <tr>
    //               <th className="py-3 px-4 text-left">Book Title</th>
    //               <th className="py-3 px-4 text-left">Author</th>
    //               <th className="py-3 px-4 text-left">Publisher</th>
    //               <th className="py-3 px-4 text-left">Price</th>
    //             </tr>
    //           </thead>

    //           <tbody>
    //             {bookDetails.map((book) => (
    //               <tr
    //                 key={book.id}
    //                 className="border-b hover:bg-gray-100 transition"
    //               >
    //                 <td className="py-3 px-4 font-medium">{book.bookTitle}</td>
    //                 <td className="py-3 px-4">{book.authorName}</td>
    //                 <td className="py-3 px-4">{book.publisherName}</td>
    //                 <td className="py-3 px-4 text-blue-600 font-semibold">
    //                   ₹{book.bookPrice}
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </>
    //   )}
    // </div>

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Library Books
          </h1>

          <Grid
            data={bookDetails}
            columns={[
              {
                field: "bookTitle",
                header: "Book Title",
              },
              {
                field: "authorName",
                header: "Author",
              },
              {
                field: "publisherName",
                header: "Publisher",
              },
              {
                field: "bookPrice",
                header: "Price",
              },
              {
                field: "bookCategory",
                header: "Category",
              },
              {
                header: "Action",
                buttonCaption: "Delete",
                onClick: async (book) => {
                  await ApiService.del(`books/${book.id}`);
                  const updated = bookDetails.filter(
                    (item) => item.id !== book.id,
                  );
                  setBookDetails(updated);
                },
              },
            ]}
          />
        </>
      )}
    </div>
  );
}

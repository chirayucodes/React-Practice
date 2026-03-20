import { useEffect, useState } from "react";
import { ApiService } from "services";
//mport Button from "shared/components/button";
import { Grid } from "shared/components/grid";
import { Loader } from "shared/components/loader";
import AddBook from "./Create";

interface BookDetails {
  id: number;
  bookTitle: string;
  authorName: string;
  publisherName: string;
  bookPrice: number;
  bookCategory: number;
}

export default function List() {
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState<BookDetails[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ApiService.get<BookDetails[]>("books")
      .then((data) => setBookDetails(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Library Books
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Book
          </button>

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
          <AddBook
            isOpen={showModal}
            onClose={() => setShowModal(false)}

          />
        </>
      )}
    </div>
  );
}

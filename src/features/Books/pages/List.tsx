import { useEffect, useState } from "react";
import { ApiService } from "services";
//mport Button from "shared/components/button";
import { Grid } from "shared/components/grid";
import { Loader } from "shared/components/loader";
import AddBook from "./Create";
import { useNavigate } from "react-router";
import { useBooksQuery, useDeleteBookMutation } from "../queries";

interface BookDetails {
  id: number;
  bookTitle: string;
  authorName: string;
  publisherName: string;
  bookPrice: number;
  bookCategory: number;
}

export default function List() {
  const navigate = useNavigate();

  const {data =[], isLoading}= useBooksQuery();
  const {isPending, mutateAsync} = useDeleteBookMutation();

  if (isLoading || isPending){
    return<Loader/>
  }

  if (data.length === 0){
    return <div>No Books Found.</div>
  }

  function setShowModal(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
       : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Library Books
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            + Add Book
          </button>

          <Grid<BookDetails>
            data={data}
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
          <AddBook isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
}

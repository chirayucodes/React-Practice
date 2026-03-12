import { useEffect, useState } from "react";

interface BookDetails {
  id: number;
  bookTitle: string;
  authorName: string;
  publisherName: string;
  bookPrice: number;
  categoryID: number;
}

export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState<BookDetails[]>([]);

  useEffect(() => {
    fetch("https://localhost:7215/api/books", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset= utf-8",
      },
    })
      .then(response => response.json())
      .then(data => setBookDetails(data));
  }, []);

  return (
    <ul>
      {bookDetails.map(s => {
        return <li>{s.bookTitle}</li>;
      })}
    </ul>
  );
}

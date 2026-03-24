declare namespace Master {
  interface BookDetails {
    bookTitle: string;
    authorName: string;
    publisherName: string;
    bookPrice: number;
    categoryID: number;
  }
  interface BookForm extends BookDetails {
    id: number;
  }

  interface UserForm extends UserItems {
    name: string;
    type: string;
  }
  interface UserItems {
    id: number;
  }
}
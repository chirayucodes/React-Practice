declare namespace Master {
  interface BookForm {
    id: number;
    bookTitle: string;
    authorName: string;
    publisherName: string;
    bookPrice: number;
    categoryID: number;
  }
  interface BookItems extends BookForm {
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
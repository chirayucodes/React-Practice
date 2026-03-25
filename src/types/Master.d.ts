declare namespace Master {
  interface BookForm {
    bookTitle: string;
    authorName: string;
    publisherName: string;
    bookPrice: number;
    categoryID: number;
    bookCategory: string;
  }
  interface BookDetails extends BookForm {
    id: number;
  }

  interface MemberForm  {
    name: string;
    typeName: string;
  }
  interface MemberItems extends MemberForm {
    id: number;
  } 
}
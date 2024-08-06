export interface Post {
    _id?: string; // MongoDB ObjectId is typically represented as a string
    title: string;
    description: string;
    file?: string;
  }
  
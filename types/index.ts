interface User {
  image: string;
  name: string;
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}

export interface UserData {
  currentUser: User;
  productRequests: ProductRequest[];
}

export interface IRoadMapData {
  planned: {
    upvotes: number;
    arr:  ProductRequest[]
  };
  inProgress: {
    upvotes: number;
    arr:  ProductRequest[]
  };
  live: {
    upvotes: number;
    arr:  ProductRequest[]
  };
}
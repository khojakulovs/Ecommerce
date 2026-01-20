export interface ProductType {
  id: number;
  title: string;
  quantity: number
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

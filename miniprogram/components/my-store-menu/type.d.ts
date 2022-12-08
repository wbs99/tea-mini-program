type CategoryWithProduct = {
  id: string;
  name: string;
  products: Product[]
}

type Product = {
  id: string;
  name: string;
  description: string;
  photo: string;
  price: number;
}
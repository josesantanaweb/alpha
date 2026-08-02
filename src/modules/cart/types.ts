export type CartProduct = {
  id: string;
  name: string;
  designer: string;
  image: string;
  price: number;
  originalPrice: number;
};

export type CartItemData = {
  id: string;
  perfumeId: string;
  quantity: number;
  perfume: CartProduct;
};

export type CartData = {
  id: string;
  userId: string;
  items: CartItemData[];
};

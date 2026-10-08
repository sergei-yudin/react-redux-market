export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  available: boolean;
  description: string;
  features: string[];
  isNew?: boolean;
};

export type ProductFormState = Omit<
  Product,
  "id" | "price" | "originalPrice" | "reviewsCount"
> & {
  price: string;
  originalPrice: string;
  reviewsCount: string;
  errors: Record<string, string>;
};

export type SortField = "name" | "price" | "rating";
export type SortOrder = "asc" | "desc";

export type RootState = {
  products: { items: Product[]; categories: string[] };
  form: ProductFormState;
  ui: { sortBy: SortField; sortOrder: SortOrder; notification: string | null };
};

export type Action =
  | {
      type: "FIELD";
      payload: {
        field: keyof ProductFormState;
        value: ProductFormState[keyof ProductFormState];
      };
    }
  | { type: "ERRORS"; payload: Record<string, string> }
  | { type: "ADD_FEATURE"; payload: string }
  | { type: "REMOVE_FEATURE"; payload: number }
  | { type: "ADD_PRODUCT" }
  | { type: "SORT"; payload: { sortBy: SortField; sortOrder: SortOrder } }
  | { type: "CLEAR_NOTICE" };

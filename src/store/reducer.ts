import { nanoid } from "nanoid";
import type { Action, Product, ProductFormState, RootState } from "./types";

export const categories = [
  "Смартфоны",
  "Ноутбуки",
  "Планшеты",
  "Наушники",
  "Умные часы",
  "Фотоаппараты",
  "Телевизоры",
  "Игровые приставки",
];

const emptyForm: ProductFormState = {
  name: "",
  price: "",
  originalPrice: "",
  category: categories[0],
  brand: "",
  rating: 5,
  reviewsCount: "0",
  available: true,
  description: "",
  features: [],
  errors: {},
};

export const initialState: RootState = {
  products: {
    categories,
    items: [
      {
        id: nanoid(),
        name: "Nova Pro X",
        price: 89_990,
        originalPrice: 104_990,
        category: "Смартфоны",
        brand: "Nova",
        rating: 4.9,
        reviewsCount: 842,
        available: true,
        description: "Флагманский смартфон с профессиональной камерой",
        features: ["256 GB", "5G", "OLED"],
        isNew: true,
      },
      {
        id: nanoid(),
        name: "Sonic Air Studio",
        price: 18_990,
        category: "Наушники",
        brand: "Sonic",
        rating: 4.7,
        reviewsCount: 1_284,
        available: true,
        description: "Беспроводные наушники с активным шумоподавлением",
        features: ["ANC", "40 часов", "Hi-Res"],
      },
      {
        id: nanoid(),
        name: "Orbit Book 14",
        price: 124_990,
        originalPrice: 139_990,
        category: "Ноутбуки",
        brand: "Orbit",
        rating: 4.8,
        reviewsCount: 326,
        available: false,
        description: "Лёгкий ноутбук для работы и творчества",
        features: ["16 GB", "1 TB SSD", "2K"],
      },
    ],
  },
  form: emptyForm,
  ui: { sortBy: "rating", sortOrder: "desc", notification: null },
};

export function reducer(state = initialState, action: Action): RootState {
  switch (action.type) {
    case "FIELD":
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value,
          errors: { ...state.form.errors, [action.payload.field]: "" },
        },
      };
    case "ERRORS":
      return { ...state, form: { ...state.form, errors: action.payload } };
    case "ADD_FEATURE":
      return {
        ...state,
        form: {
          ...state.form,
          features: [...state.form.features, action.payload],
        },
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        form: {
          ...state.form,
          features: state.form.features.filter(
            (_, index) => index !== action.payload,
          ),
        },
      };
    case "ADD_PRODUCT": {
      const form = state.form;
      const product: Product = {
        id: nanoid(),
        name: form.name.trim(),
        price: Number(form.price),
        originalPrice: form.originalPrice
          ? Number(form.originalPrice)
          : undefined,
        category: form.category,
        brand: form.brand.trim(),
        rating: form.rating,
        reviewsCount: Number(form.reviewsCount) || 0,
        available: form.available,
        description: form.description.trim(),
        features: form.features,
        isNew: true,
      };
      return {
        ...state,
        products: {
          ...state.products,
          items: [product, ...state.products.items],
        },
        form: emptyForm,
        ui: { ...state.ui, notification: "Товар успешно добавлен" },
      };
    }
    case "SORT":
      return { ...state, ui: { ...state.ui, ...action.payload } };
    case "CLEAR_NOTICE":
      return { ...state, ui: { ...state.ui, notification: null } };
    default:
      return state;
  }
}

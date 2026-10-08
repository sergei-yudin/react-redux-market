import type { ProductFormState } from "../store/types";

export function validateProduct(form: ProductFormState) {
  const errors: Record<string, string> = {};
  if (form.name.trim().length < 3) errors.name = "Минимум 3 символа";
  if (Number(form.price) <= 0) errors.price = "Укажите цену больше 0";
  if (form.originalPrice && Number(form.originalPrice) <= Number(form.price))
    errors.originalPrice = "Старая цена должна быть выше текущей";
  if (form.brand.trim().length < 2) errors.brand = "Минимум 2 символа";
  if (form.description.trim().length < 10)
    errors.description = "Минимум 10 символов";
  return errors;
}

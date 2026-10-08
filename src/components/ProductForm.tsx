import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, selectForm } from "../store/selectors";
import type { AppDispatch } from "../store/store";
import type { ProductFormState } from "../store/types";
import { validateProduct } from "../utils/validateProduct";

export function ProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const form = useSelector(selectForm);
  const categories = useSelector(selectCategories);
  const [feature, setFeature] = useState("");
  const setField = <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K],
  ) => dispatch({ type: "FIELD", payload: { field, value } });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const errors = validateProduct(form);
    if (Object.keys(errors).length)
      dispatch({ type: "ERRORS", payload: errors });
    else {
      dispatch({ type: "ADD_PRODUCT" });
      window.setTimeout(() => dispatch({ type: "CLEAR_NOTICE" }), 2_500);
    }
  };
  const addFeature = () => {
    if (feature.trim()) {
      dispatch({ type: "ADD_FEATURE", payload: feature.trim() });
      setFeature("");
    }
  };

  return (
    <form className="product-form" onSubmit={submit} noValidate>
      <div className="form-head">
        <b>Новый товар</b>
        <span>Все поля управляются Redux</span>
      </div>
      <label>
        Название
        <input
          aria-label="Название товара"
          value={form.name}
          onChange={(event) => setField("name", event.target.value)}
        />
        {form.errors.name && <small>{form.errors.name}</small>}
      </label>
      <div className="two">
        <label>
          Цена
          <input
            aria-label="Цена"
            type="number"
            value={form.price}
            onChange={(event) => setField("price", event.target.value)}
          />
          {form.errors.price && <small>{form.errors.price}</small>}
        </label>
        <label>
          Старая цена
          <input
            aria-label="Первоначальная цена"
            type="number"
            value={form.originalPrice}
            onChange={(event) => setField("originalPrice", event.target.value)}
          />
          {form.errors.originalPrice && (
            <small>{form.errors.originalPrice}</small>
          )}
        </label>
      </div>
      <div className="two">
        <label>
          Категория
          <select
            aria-label="Категория"
            value={form.category}
            onChange={(event) => setField("category", event.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Бренд
          <input
            aria-label="Бренд"
            value={form.brand}
            onChange={(event) => setField("brand", event.target.value)}
          />
          {form.errors.brand && <small>{form.errors.brand}</small>}
        </label>
      </div>
      <div className="two">
        <label>
          Рейтинг: {form.rating}
          <input
            aria-label="Рейтинг"
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(event) => setField("rating", Number(event.target.value))}
          />
        </label>
        <label>
          Отзывы
          <input
            aria-label="Количество отзывов"
            type="number"
            value={form.reviewsCount}
            onChange={(event) => setField("reviewsCount", event.target.value)}
          />
        </label>
      </div>
      <label>
        Описание
        <textarea
          aria-label="Описание"
          value={form.description}
          onChange={(event) => setField("description", event.target.value)}
        />
        {form.errors.description && <small>{form.errors.description}</small>}
      </label>
      <label className="check">
        <input
          aria-label="В наличии"
          type="checkbox"
          checked={form.available}
          onChange={(event) => setField("available", event.target.checked)}
        />{" "}
        В наличии
      </label>
      <label>
        Особенности
        <div className="feature-input">
          <input
            aria-label="Новая особенность"
            value={feature}
            onChange={(event) => setFeature(event.target.value)}
            placeholder="Например, 5G"
          />
          <button type="button" onClick={addFeature}>
            +
          </button>
        </div>
      </label>
      <div className="tags">
        {form.features.map((item, index) => (
          <button
            type="button"
            key={`${item}-${index}`}
            onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: index })}
          >
            {item} ×
          </button>
        ))}
      </div>
      <button className="submit">Добавить товар</button>
    </form>
  );
}

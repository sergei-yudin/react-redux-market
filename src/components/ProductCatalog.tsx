import { useDispatch, useSelector } from "react-redux";
import { selectSortedProducts, selectUi } from "../store/selectors";
import type { AppDispatch } from "../store/store";
import type { SortField } from "../store/types";
import { ProductCard } from "./ProductCard";

export function ProductCatalog() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectSortedProducts);
  const ui = useSelector(selectUi);
  return (
    <section className="catalog">
      <div className="catalog-head">
        <div>
          <p>КАТАЛОГ</p>
          <h2>Показано товаров: {products.length}</h2>
        </div>
        <div>
          <select
            aria-label="Сортировка"
            value={ui.sortBy}
            onChange={(event) =>
              dispatch({
                type: "SORT",
                payload: {
                  sortBy: event.target.value as SortField,
                  sortOrder: ui.sortOrder,
                },
              })
            }
          >
            <option value="rating">По рейтингу</option>
            <option value="price">По цене</option>
            <option value="name">По названию</option>
          </select>
          <button
            className="order"
            aria-label="Порядок сортировки"
            onClick={() =>
              dispatch({
                type: "SORT",
                payload: {
                  sortBy: ui.sortBy,
                  sortOrder: ui.sortOrder === "asc" ? "desc" : "asc",
                },
              })
            }
          >
            {ui.sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

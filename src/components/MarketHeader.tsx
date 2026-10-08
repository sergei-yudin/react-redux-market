import { useSelector } from "react-redux";
import { selectSortedProducts } from "../store/selectors";

export function MarketHeader() {
  const productCount = useSelector(selectSortedProducts).length;
  return (
    <header className="hero">
      <div>
        <p>REDUX MARKET / 2026</p>
        <h1>
          Вещи, которые
          <br />
          <i>работают.</i>
        </h1>
      </div>
      <span>
        {productCount}
        <small>товаров в каталоге</small>
      </span>
    </header>
  );
}

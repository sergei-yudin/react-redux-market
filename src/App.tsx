import { useSelector } from "react-redux";
import { MarketHeader } from "./components/MarketHeader";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductForm } from "./components/ProductForm";
import { selectUi } from "./store/selectors";
import "./App.css";

export default function App() {
  const notification = useSelector(selectUi).notification;
  return (
    <main>
      <MarketHeader />
      {notification && <div className="notice">✓ {notification}</div>}
      <section className="layout">
        <ProductForm />
        <ProductCatalog />
      </section>
    </main>
  );
}

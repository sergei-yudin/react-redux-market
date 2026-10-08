import type { Product } from "../store/types";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  return (
    <article className="card">
      <div className="visual">
        <span>{product.category[0]}</span>
        <div>
          {product.isNew && <b>Новинка</b>}
          {discount > 0 && <b className="sale">−{discount}%</b>}
          {!product.available && <b className="off">Нет в наличии</b>}
        </div>
      </div>
      <p className="brand">
        {product.brand} · {product.category}
      </p>
      <h3>{product.name}</h3>
      <p className="rating">
        ★ {product.rating} <span>{product.reviewsCount} отзывов</span>
      </p>
      <div className="prices">
        <strong>{product.price.toLocaleString("ru-RU")} ₽</strong>
        {product.originalPrice && (
          <del>{product.originalPrice.toLocaleString("ru-RU")} ₽</del>
        )}
      </div>
      <p className="desc">{product.description}</p>
      <div className="tags">
        {product.features.map((feature) => (
          <span key={feature}>{feature}</span>
        ))}
      </div>
    </article>
  );
}

export default function CategoryCard({ category, onClick }) {
  return (
    <div className="cat-card" onClick={onClick}>
      <div className="dot"></div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M6 12l9-9 3 3-9 9-4 1z" />
      </svg>
      <div className="label">{category.name}</div>
    </div>
  );
}

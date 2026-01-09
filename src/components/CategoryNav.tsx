import { useState } from "react";

const categories = [
  "Antibiotic Injections",
  "Critical Care",
  "Gastrointestinal",
  "Emergency Medicines",
  "Hospital Supplies",
  "ICU Products",
];

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("Antibiotic Injections");

  return (
    <div className="pharma-category-nav py-3 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-pill whitespace-nowrap ${
                activeCategory === category ? "category-pill-active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

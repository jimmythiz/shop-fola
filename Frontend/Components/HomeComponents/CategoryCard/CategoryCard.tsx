import "./CategoryCard.css"
import { FC } from "react";
import { IconType } from "react-icons";

interface Category {
  name: string;
  icon: IconType;
}

interface Props {
  category: Category;
}

const CategoryCard: FC<Props> = ({ category }) => {
  const Icon = category.icon;

  return (
    <div className="category-card">
        <Icon className="category-icon" />
        <p>{category.name}</p>
    </div>
  )
}

export default CategoryCard
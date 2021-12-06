import React, { useEffect } from "react";
import "./MenuHeader.css";
import { getAllCategory } from "../../actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
    <div style={{width: '100%'}}>
      <div className="menuHeader">
        <ul>
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </ul>
      </div>
    </div>
  );
};

export default MenuHeader;

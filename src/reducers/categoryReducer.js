import { categoryConstansts } from "../actions/constants";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if(parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [], 
      }
    ];
  }

  for (let cat of categories) {
    if ( cat._id == parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children 
            ? buildNewCategories(parentId, [...cat.children, {
              _id: category._id,
              name: category.name,
              slug: category.slug,
              parentId: category.parentId,
              children: category.children,
            }], category)
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children 
            ? buildNewCategories(parentId, cat.children, category)
            : [],
      });
    }
  }

  return myCategories;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updateCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log(updateCategories);

      state = {
        ...state,
        categories: updateCategories,
        loading: false,
      };
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initialState,
      };
      break;

    default:
      break;
  }
  return state;
};

export default categoryReducer;

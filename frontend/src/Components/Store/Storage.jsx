import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
export const context = createContext({
  allfounditem: [],
  alllostitems: [],
  addItem: () => {},
});
function reducer(currentstate, action) {
  let newlist = currentstate;
  if (action.type === "ADD_ITEM") {
    newlist = [action.payload.item, ...currentstate];
  }
  if (action.type === "ADD_ITEMS") {
    newlist = action.payload.post;
  }
  return newlist;
}

export default function Storage({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        add_Items(data);
      });
  }, []);

  function add_Items(post) {
    dispatch({
      type: "ADD_ITEMS",
      payload: {
        post,
      },
    });
  }

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item,
      },
    });
  }
  return (
    <div>
      <context.Provider
        value={{ allfounditem: state, alllostitems: state, addItem }}
      >
        {children}
      </context.Provider>
      ;
    </div>
  );
}

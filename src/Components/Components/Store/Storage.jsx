import React, { useEffect, useReducer, useState } from "react";
import { createContext } from "react";
export const context = createContext({
  allfounditem: [],
  alllostitems: [],
  add_Item: () => {},
  add_Item_Lost: () => {},
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

  const [loststate, lostdispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        add_Items(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/postslost")
      .then((res) => res.json())
      .then((data) => {
        add_Items_Lost(data);
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
  function add_Items_Lost(post) {
    lostdispatch({
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

  function add_Item_Lost(item) {
    lostdispatch({
      type: "ADD_ITEM",
      payload: {
        item,
      },
    });
  }
  return (
    <div>
      <context.Provider
        value={{
          allfounditem: state,
          alllostitems: loststate,
          addItem,
          add_Item_Lost,
        }}
      >
        {children}
      </context.Provider>
      ;
    </div>
  );
}

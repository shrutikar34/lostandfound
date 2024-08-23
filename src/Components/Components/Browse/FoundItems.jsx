import React, { useContext } from "react";

import { context } from "../Store/Storage";
import FoundItemsList from "../FoundItemsList";

export default function FoundItems() {
  const { allfounditem } = useContext(context);
  return (
    <div className="flex flex-row flex-wrap gap-9 mx-8 my-8">
      {allfounditem.map((list) => (
        <FoundItemsList key={list.id} founditem={list} />
      ))}
    </div>
  );
}

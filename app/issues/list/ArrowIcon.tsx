import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

interface Props {
  columnVal: string;
  orderBy: string;
  sortOrder: "asc" | "desc";
}

const ArrowIcon = ({ columnVal, orderBy, sortOrder }: Props) => {
  if (columnVal !== orderBy) {
    return <ArrowUpIcon className="inline invisible" />;
  } else if (sortOrder === "asc") {
    return <ArrowUpIcon className="inline" />;
  } else {
    return <ArrowDownIcon className="inline" />;
  }
};

export default ArrowIcon;

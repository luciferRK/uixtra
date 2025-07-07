import React from "react";
import { RepeatProps } from "./Repeat.types";

const Repeat: React.FC<RepeatProps> = (props) => {
  const {
    for: list,
    element: Element,
    key = (item, index) => `${item?.id || ''}-${index}`,
    passIndex = false,
    passItem = false,
    ...restProps
  } = props;

  return list.map((item, index) => (
    <Element
      item={passItem ? item : undefined}
      index={passIndex ? index : undefined}
      key={key(item, index)}
      {...restProps}
    />
  ));
};

export default Repeat;

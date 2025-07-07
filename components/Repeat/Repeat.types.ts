import React from "react";

export interface RepeatProps extends React.HTMLAttributes<any> {
  for: Array<any>;
  element: React.FC<any>;
  key?: (item: any, index: number) => string | number;
  passItem?: boolean;
  passIndex?: boolean;
}
import React from 'react';
import { ShowProps } from './ShowIf.types';

export const Show: React.FC<ShowProps> = (props) => {
  const { if: ifProp, children } = props;

  return <>{ifProp && children}</>;
};

export const ShowIfElse: React.FC<ShowProps> = (props) => {
  const { if: ifProp = false, children } = props;
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.length === 2 &&
        (ifProp ? childrenArray[0] : childrenArray[1])}
    </>
  );
};

import {
  ShowIfElse as ShowIfElseComponent,
  Show as ShowComponent,
} from './ShowIf';
export type { ShowProps } from './ShowIf.types';

type ShowType = typeof ShowComponent;
type ShowIfElseType = typeof ShowIfElseComponent;

const Show = ShowComponent as ShowType;
const ShowIfElse = ShowIfElseComponent as ShowIfElseType;

export { Show, ShowIfElse };

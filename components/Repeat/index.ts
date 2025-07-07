import RepeatComponent from "./Repeat";

export type { RepeatProps } from "./Repeat.types";

type RepeatType = typeof RepeatComponent;

const Repeat = RepeatComponent as RepeatType;

export { Repeat };
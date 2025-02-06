export type { FadeInProps } from './FadeIn.types';
import FadeInComponent from './FadeIn';

type FadeInType = typeof FadeInComponent;

const FadeIn = FadeInComponent as FadeInType;

export { FadeIn };

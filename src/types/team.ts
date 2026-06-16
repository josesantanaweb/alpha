import { League } from "./league";

export enum StreakType {
  WIN = 'WIN',
  LOSE = 'LOSE',
  DRAW = 'DRAW',
}

export interface Tag {
  label: string;
}

export interface Team {
  id: string;
  isFavorite?: boolean | null;
  league?: League | null;
  logo: string;
  name: string;
  streak?: StreakType[] | null;
  tags?: Tag[] | null;
}

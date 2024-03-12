import { createEffect, createEvent, createStore, sample } from "effector";

// TODO: BASE URL ВЫНЕСТ В shared/constants
import { BASE_URL } from "../../../widgets/groups/model/groups.ts";
import {
  $filteredGroups,
  $groups,
  Group,
} from "../../../entity/group/model/group.ts";
// TODO: ВЫНЕСТ В shared/types
export enum COLOR_VARIANTS {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

export const getColorsFx = createEffect<void, COLOR_VARIANTS[]>(async () => {
  const res = await fetch(`${BASE_URL}colors/`);

  if (!res.ok) {
    throw new Error("");
  }

  const result = await res.json();

  return result.data as COLOR_VARIANTS[];
});

export const $activeType = createStore<string | null>("Все");
export const $activeColor = createStore<COLOR_VARIANTS | null>(null);

export const groupTypeClicked = createEvent<string | null>();
export const groupColorClicked = createEvent<COLOR_VARIANTS | null>();

export const $colors = createStore<COLOR_VARIANTS[] | null>(null);

sample({
  clock: getColorsFx.doneData,
  target: $colors,
});

sample({
  clock: groupTypeClicked,
  target: $activeType,
});

sample({
  clock: groupColorClicked,
  target: $activeColor,
});

sample({
  clock: $activeColor,
  source: $groups,
  fn: sortBy<COLOR_VARIANTS>("avatar_color"),
  target: $filteredGroups,
});

function sortBy<T>(sortType: keyof Group) {
  return (groups: Group[] | null, value: T | null) => {
    const result = groups?.filter((group) => group[sortType] === value);
    return result?.length ? result : null;
  };
}

import { createEffect, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { $groups, Group } from "../../../entity/group/model/group.ts";

export const BASE_URL = "http://localhost:3000/";
export const getGroupsFx = createEffect(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${BASE_URL}groups/`);

  if (res.statusText !== "OK") {
    throw new Error();
  }

  const result = await res.json();

  return result.data as Group[];
});

export const homeGate = createGate();
export const $error = createStore(false);

sample({
  clock: getGroupsFx.doneData,
  target: $groups,
});

sample({
  clock: getGroupsFx.fail,
  fn: () => true,
  target: $error,
});

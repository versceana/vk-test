import { sample } from "effector";
import { $groups } from "../../../entity/group/model/group.ts";
import { getGroupsFx, homeGate } from "../../../widgets/groups/model/groups.ts";
import {
  $colors,
  getColorsFx,
} from "../../../feautures/groups-filter/model/group-filter.ts";

sample({
  clock: homeGate.open,
  source: $groups,
  filter: (groups) => groups == null,
  target: getGroupsFx,
});

sample({
  clock: homeGate.open,
  source: $colors,
  filter: (colors) => colors == null,
  target: getColorsFx,
});

import { $error, getGroupsFx, homeGate } from "../model/groups.ts";
import { useGate, useUnit } from "effector-react";
import { $groups } from "../../../entity/group/model/group.ts";
import { GroupItem } from "../../../entity/group/ui/group.tsx";
// import { GroupFilter } from "../../../feautures/groups-filter/ui/group-filter.tsx";
// import { getColorsFx } from "../../../feautures/groups-filter/model/group-filter.ts";
export interface GroupsProps {}

export const Groups = ({}: GroupsProps) => {
  useGate(homeGate);

  const groups = useUnit($groups);
  const isLoading = useUnit(getGroupsFx.pending);
  // const isLoadingColors = useUnit(getColorsFx.pending);
  const isError = useUnit($error);

  const showGroups = !isLoading && !isError;
  // const showFilter = !isLoadingColors && !isError;

  return (
    <div>
      {/*{showFilter && <GroupFilter />}*/}
      {showGroups &&
        groups?.map((group) => (
          <>
            <GroupItem
              id={group.id}
              name={group.name}
              closed={group.closed}
              members_count={group.members_count}
              key={group.id}
              avatar_color={group.avatar_color}
              friends={group.friends}
            />
          </>
        ))}
      {isError && <div>Произошла ошибка</div>}
      {isLoading && <div>Загрузка....</div>}
    </div>
  );
};

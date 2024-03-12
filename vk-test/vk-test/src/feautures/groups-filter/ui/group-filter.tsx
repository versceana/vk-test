import styles from "./group-filter.module.scss";
import { useUnit } from "effector-react/effector-react.umd";
import {
  $activeColor,
  $activeType,
  $colors,
  COLOR_VARIANTS,
  groupColorClicked,
  groupTypeClicked,
} from "../model/group-filter.ts";

const groupTypes = ["Все", "Открытая", "Закрытая"];

export const GroupFilter = () => {
  const colors = useUnit($colors);

  const activeType = useUnit($activeType);
  const activeColor = useUnit($activeColor);
  const onTypeInputChange = (type: string, activeType: string | null) => {
    if (activeType === type) {
      groupTypeClicked(null);
      return null;
    }
    groupTypeClicked(type);
  };

  const onColorInputChange = (
    color: COLOR_VARIANTS,
    activeColor: COLOR_VARIANTS | null,
  ) => {
    if (activeColor === color) {
      groupColorClicked(null);
      return null;
    }
    groupColorClicked(color);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="text-xl font-bold mb-2">Фильтр</h2>
      <div className="flex  justify-between">
        <div>
          {groupTypes.map((groupType) => (
            <div className="flex justify-between">
              <label htmlFor="">{groupType}</label>
              <input
                type="checkbox"
                checked={activeType === groupType}
                onChange={() => onTypeInputChange(groupType, activeType)}
              />
            </div>
          ))}
        </div>
        <div>
          {colors?.length &&
            colors?.map((color) => (
              <div className="flex justify-between">
                <label htmlFor="">{color}</label>
                <input
                  type="checkbox"
                  checked={activeColor === color}
                  onChange={() => onColorInputChange(color, activeColor)}
                />
              </div>
            ))}
        </div>
        <div>
          <label htmlFor="">Друзья в группе?</label>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
};

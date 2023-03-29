import cn from "classnames";
import { FC, useState } from "react";

import { IPickPoint, PickPointId } from "@/types/pickPoint.interface";

import arrowSVG from "../../assets/img/arrow.svg";
import styles from "./DropDown.module.scss";

interface IProps {
  data: IPickPoint[];
  onPickPointClick: (id: PickPointId) => void;
  selectedPickPoint: IPickPoint | null;
}

export const DropDown: FC<IProps> = ({
  data,
  selectedPickPoint,
  onPickPointClick,
}) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  const handleItemClick = (id: PickPointId) => {
    onPickPointClick(id);
    setIsVisibleMenu(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.header, {
          [styles.headerMenuIsVisible]: isVisibleMenu,
        })}
      >
        {selectedPickPoint
          ? selectedPickPoint.address
          : "Выберите пункт выдачи"}
        <button
          className={cn(styles.button, {
            [styles.buttonRotate]: isVisibleMenu,
          })}
          onClick={() => setIsVisibleMenu((prev) => !prev)}
        >
          <img src={arrowSVG} alt="arrow" />
        </button>
      </div>
      {isVisibleMenu ? (
        <ul className={styles.menu}>
          {data.map((pickPoint) => (
            <li
              key={pickPoint.id}
              className={cn(styles.item, {
                [styles.itemSelected]: pickPoint.id === selectedPickPoint?.id,
              })}
              onClick={() => handleItemClick(pickPoint.id)}
              title={`${pickPoint.budgets}`}
            >
              {pickPoint.address}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

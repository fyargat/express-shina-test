import cn from "classnames";
import { FC, memo } from "react";

import { Chip } from "@/components/Chip";

import { IPickPoint, PickPointId } from "@/types/pickPoint.interface";

import styles from "./PickPoint.module.scss";

interface IProps {
  pickPoint: IPickPoint;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: (id: PickPointId) => void;
}

export const PickPoint: FC<IProps> = memo(
  ({ isSelected, isDisabled, pickPoint, onClick }) => {
    return (
      <div
        className={cn(styles.container, {
          [styles.containerDisabled]: isDisabled,
          [styles.containerSelected]: isSelected,
        })}
        onClick={() => onClick && onClick(pickPoint.id)}
      >
        <h3 className={styles.title}>{pickPoint.address}</h3>

        {pickPoint.budgets.length ? (
          <div className={styles.chips}>
            {pickPoint.budgets.map((v, index) => {
              return <Chip key={index} value={v} />;
            })}
          </div>
        ) : null}
      </div>
    );
  },
);

import { FC, useEffect, useRef } from "react";

import { Loader } from "@/components/Loader";
import { PickPoint } from "@/components/PickPoint";

import { IPickPoint, PickPointId } from "@/types/pickPoint.interface";

import styles from "./Aside.module.scss";

interface IProps {
  data: IPickPoint[];
  onPickPointClick: (id: PickPointId) => void;
  selectedPickPoint: IPickPoint | null;
  isLoading: boolean;
}

export const Aside: FC<IProps> = ({
  data,
  selectedPickPoint,
  onPickPointClick,
  isLoading,
}) => {
  const itemsRef = useRef<Map<PickPointId, HTMLLIElement>>(new Map());

  useEffect(() => {
    if (selectedPickPoint?.id) {
      const element = itemsRef?.current.get(selectedPickPoint.id);

      element &&
        element.scrollIntoView({
          behavior: "smooth",
        });
    }
  }, [selectedPickPoint]);

  if (isLoading) return <Loader />;

  return (
    <ul className={styles.container}>
      {data.map((pickPoint) => (
        <li
          className={styles.item}
          key={pickPoint.id}
          ref={(el) => el && itemsRef?.current.set(pickPoint.id, el)}
        >
          <PickPoint
            pickPoint={pickPoint}
            onClick={onPickPointClick}
            isSelected={selectedPickPoint?.id === pickPoint.id}
          />
        </li>
      ))}
    </ul>
  );
};

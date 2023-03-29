import { FC } from "react";

import { BudgetValue } from "@/types/pickPoint.interface";

import styles from "./Chip.module.scss";

interface IProps {
  value: BudgetValue;
}

export const Chip: FC<IProps> = ({ value }) => {
  return <div className={styles.container}>{value}</div>;
};

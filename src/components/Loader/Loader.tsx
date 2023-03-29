import { FC } from "react";

import styles from "./Loader.module.scss";

interface IProps {}

export const Loader: FC<IProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

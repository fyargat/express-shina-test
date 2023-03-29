import { FC, PropsWithChildren } from "react";

import styles from "./Wrapper.module.scss";

interface IProps extends PropsWithChildren {}

export const Wrapper: FC<IProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

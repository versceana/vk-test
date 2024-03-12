import { Groups } from "../../../widgets/groups";
import styles from "./home-page.module.scss";
import "../model/home-page.ts";

export interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  return (
    <div className={styles.wrapper}>
      <h1>Группы:</h1>
      <Groups />
    </div>
  );
};

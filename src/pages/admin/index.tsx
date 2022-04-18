import type { NextPage } from "next";
import styles from "@styles/Home.module.css";

interface AdminPageProps {
  lobby: {
    name: string;
    password: string;
  };
}

const AdminPage: NextPage<AdminPageProps> = (props) => {
  console.log(props);

  return <div className={styles.container}></div>;
};

export default AdminPage;

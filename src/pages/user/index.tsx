import styles from "@styles/Home.module.css";

import { getSession, useSession } from "next-auth/react";
import type { GetServerSideProps, NextPage } from "next";
import { UserPageProps } from "@constants/interfaces";
import { RedirectOptions } from "@constants/enums";
import { redirectUser } from "@utils/userUtils";

import UserProfile from "@components/User/UserProfile";
import prisma from "@lib/client";

const UserPage: NextPage<UserPageProps> = ({ user, profile }) => {
  const { data: session } = useSession();

  return <main className={styles.container}>{session && <UserProfile user={session.user} profile={profile} />}</main>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !session.user) {
    return redirectUser(RedirectOptions.login);
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email || undefined,
    },
  });

  const profile = await prisma.profile.findFirst({
    where: {
      userEmail: user?.email || undefined,
    },
  });

  return {
    props: {
      user,
      profile,
    },
  };
};

export default UserPage;

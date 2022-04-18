import { RedirectOptions } from "@constants/enums";

export const redirectUser = (option: RedirectOptions) => {
  return {
    redirect: {
      permanent: false,
      destination: option,
    },
  };
};

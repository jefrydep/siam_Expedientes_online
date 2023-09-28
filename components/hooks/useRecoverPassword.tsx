import { findAcount } from "@/utils/users";

const useRecoverPassword = (
  ide_eje: number,
  ruc_eje: number,
  user_log: number,
  user_email: string
) => {
  const findUserAcount = async () => {
    const user = await findAcount(ide_eje, ruc_eje, user_log, user_email);
    console.log(user);
  };

  return { findUserAcount };
};

export default useRecoverPassword;

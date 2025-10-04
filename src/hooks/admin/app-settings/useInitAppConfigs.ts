import { initAppConfigsAction } from "@/actions/admin/app-configs";
import { useMutation } from "@tanstack/react-query";

const useInitAppConfigs = () => {
  return useMutation({
    mutationFn: initAppConfigsAction,
  });
};

export default useInitAppConfigs;

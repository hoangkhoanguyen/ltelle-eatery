import { updateAppConfigsAction } from "@/actions/admin/app-configs";
import { useMutation } from "@tanstack/react-query";

const useUpdateAppConfigs = () => {
  return useMutation({
    mutationFn: updateAppConfigsAction,
  });
};

export default useUpdateAppConfigs;

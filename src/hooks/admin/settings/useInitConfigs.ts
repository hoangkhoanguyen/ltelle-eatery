import { initConfigsAction } from "@/actions/admin/configs";
import { useMutation } from "@tanstack/react-query";

const useInitConfigs = () => {
  return useMutation({
    mutationFn: initConfigsAction,
  });
};

export default useInitConfigs;

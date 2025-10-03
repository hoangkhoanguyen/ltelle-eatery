import { initUIConfigsAction } from "@/actions/admin/ui.configs";
import { useMutation } from "@tanstack/react-query";

const useInitUIConfigs = () => {
  return useMutation({
    mutationFn: initUIConfigsAction,
  });
};

export default useInitUIConfigs;

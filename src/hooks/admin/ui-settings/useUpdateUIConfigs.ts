import { updateUIConfigsAction } from "@/actions/admin/ui.configs";
import { useMutation } from "@tanstack/react-query";

const useUpdateUIConfigs = () => {
  return useMutation({
    mutationFn: updateUIConfigsAction,
  });
};

export default useUpdateUIConfigs;

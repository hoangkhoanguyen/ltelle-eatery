import { updateConfigsAction } from "@/actions/admin/configs";
import { useMutation } from "@tanstack/react-query";

const useUpdateConfigs = () => {
  return useMutation({
    mutationFn: updateConfigsAction,
  });
};

export default useUpdateConfigs;

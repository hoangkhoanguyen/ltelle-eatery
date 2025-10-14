import { updateConfigsAction } from "@/actions/admin/configs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateConfigs = () => {
  return useMutation({
    mutationFn: updateConfigsAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Cập nhật cấu hình thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export default useUpdateConfigs;

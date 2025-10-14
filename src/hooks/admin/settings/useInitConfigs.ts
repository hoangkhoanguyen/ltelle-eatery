import { initConfigsAction } from "@/actions/admin/configs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useInitConfigs = () => {
  return useMutation({
    mutationFn: initConfigsAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Khởi tạo cấu hình thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export default useInitConfigs;

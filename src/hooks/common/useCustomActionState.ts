import { useTransition } from "react";

const useCustomActionState = <T, K>(serverAction: (data: T) => Promise<K>) => {
  const [isPending, startTransition] = useTransition();

  return {
    isPending,
    action: (data: T) => {
      startTransition(() => {
        serverAction(data);
      });
    },
  };
};

export default useCustomActionState;

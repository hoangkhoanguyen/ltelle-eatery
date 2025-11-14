"use client";
import { useQuickCartModalStore } from "@/hooks/web/quick-cart";
import React from "react";
import Modal from "../../ui/modal/Modal";
import Icon from "@/components/common/Icon";
import { useQuery } from "@tanstack/react-query";
import { webApi } from "@/lib/api/axios";
import { webRoutes } from "@/constants/route";
import { WebProductDetails } from "@/types/products";
import QuickCartForm from "./QuickCartForm";

const QuickCartModal = () => {
  const isOpen = useQuickCartModalStore((state) => state.isOpen);
  const closeModal = useQuickCartModalStore((state) => state.closeModal);
  const productId = useQuickCartModalStore((state) => state.productId);

  const { data } = useQuery({
    queryKey: ["quick-product", productId],
    queryFn: (): Promise<{
      product: Pick<
        WebProductDetails,
        | "id"
        | "title"
        | "price"
        | "category"
        | "allergenInfo"
        | "addons"
        | "images"
      >;
    }> => webApi.get(webRoutes.productQuickApi(productId!)),
    enabled: Boolean(productId),
    select(data) {
      return data.product;
    },
  });

  const renderContent = () => {
    if (!data) {
      return <div>Loading...</div>;
    }

    return <QuickCartForm product={data} closeModal={closeModal} />;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="p-0 lg:p-5 h-screen w-full"
        // className="bg-web-background-1 w-full h-screen max-w-2xl flex flex-col items-stretch"
      >
        <div className="bg-web-background-1 w-full h-full lg:max-w-2xl p-6 flex flex-col mx-auto">
          <div className="flex justify-end mb-3">
            <button
              className="text-4xl text-web-content-1"
              onClick={closeModal}
            >
              <Icon icon="ph:x" />
            </button>
          </div>
          {renderContent()}
        </div>
      </Modal>
    </>
  );
};

export default QuickCartModal;

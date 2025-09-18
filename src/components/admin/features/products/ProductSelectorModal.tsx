import React, { forwardRef } from "react";
import { LayoutRef, LayoutWithRef, Modal } from "../../ui/layout";
import useFetchAllProducts from "@/hooks/admin/features/products/useFetchAllProducts";
import { Select } from "../../ui/form";

const ProductSelectorModal = forwardRef<LayoutRef>(({}, ref) => {
  const { data = [] } = useFetchAllProducts();

  return (
    <LayoutWithRef ref={ref} Component={Modal}>
      <div className="card bg-white w-md">
        <div className="card-body">
          <p className="card-title">Chọn sản phẩm liên quan</p>
          <Select>{}</Select>
        </div>
      </div>
    </LayoutWithRef>
  );
});
export default ProductSelectorModal;

ProductSelectorModal.displayName = "ProductSelectorModal";

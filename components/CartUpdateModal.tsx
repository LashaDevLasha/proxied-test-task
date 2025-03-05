import React from "react";
import { Modal, Button } from "antd";
import { CartItemUpdate } from "@/types/types";

interface CartUpdateModalProps {
  open: boolean;
  onClose: () => void;
  updatedItems: CartItemUpdate[];
}

const CartUpdateModal: React.FC<CartUpdateModalProps> = ({
  open,
  onClose,
  updatedItems,
}) => {
  if (!open || updatedItems.length === 0) return null;

  return (
    <Modal
      title="Cart Item Updates"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {updatedItems.map((item) => (
        <div key={item.payload._id} className="item-update">
          {/* <h3>Item: {item.payload.product?.title}</h3> */}
          <p>{item.event}</p>
          {/* <p>Updated Quantity: {item.payload.title}</p> */}
        </div>
      ))}
    </Modal>
  );
};

export default CartUpdateModal;

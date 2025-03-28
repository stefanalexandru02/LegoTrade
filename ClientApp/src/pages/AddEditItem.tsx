import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryForm } from "../components/InventoryForm";
import { InventoryItem, inventoryService } from "../services/inventoryService";

export const AddEditItem: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (item: InventoryItem) => {
    if (id) {
      await inventoryService.updateItem(id, item);
    } else {
      await inventoryService.createItem(item);
    }
    navigate("/my-sets");
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Item" : "Add Item"}
      </h1>
      <div className="max-w-[540px]">
        <InventoryForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

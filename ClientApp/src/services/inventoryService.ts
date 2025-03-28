import authService from "../components/api-authorization/AuthorizeService";

const baseUrl = "api/inventory";

export interface InventoryItem {
  id?: string;
  type: "Set" | "Part";
  itemId: string;
  quantity: number;
  condition: "New" | "Used" | "Incomplete";
  notes?: string;
}

export const inventoryService = {
  async getMyInventory() {
    const token = await authService.getAccessToken();
    const response = await fetch(baseUrl, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  },

  async createItem(item: InventoryItem) {
    const token = await authService.getAccessToken();
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(!token ? {} : { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(item),
    });
    return await response.json();
  },

  async updateItem(id: string, item: InventoryItem) {
    const token = await authService.getAccessToken();
    await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(!token ? {} : { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(item),
    });
  },

  async deleteItem(id: string) {
    const token = await authService.getAccessToken();
    await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
  },
};

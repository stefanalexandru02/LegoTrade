import authService from "../components/api-authorization/AuthorizeService";

export interface LegoSet {
  id?: string;
  number: string;
  type: "SET" | "PART";
  name?: string;
}

export const setService = {
  async searchSet(number: string): Promise<LegoSet | null> {
    const token = await authService.getAccessToken();
    const response = await fetch(`/api/legosets/number/${number}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Failed to search set");
    return response.json();
  },

  async createSet(set: LegoSet): Promise<LegoSet> {
    const token = await authService.getAccessToken();
    const response = await fetch("/api/legosets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(set),
    });

    if (!response.ok) {
      throw new Error("Failed to create set");
    }
    return response.json();
  },
};

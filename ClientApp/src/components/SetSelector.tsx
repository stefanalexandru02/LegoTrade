import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { setService, LegoSet } from "../services/setService";

interface SetSelectorProps {
  onSelect: (setNumber: string) => void;
}

export const SetSelector: React.FC<SetSelectorProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [createNew, setCreateNew] = useState(false);
  const [type, setType] = useState<"SET" | "PART">("SET");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await setService.searchSet(searchTerm);
      if (!result) {
        setCreateNew(true);
      } else {
        onSelect(result.number);
        setOpen(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const newSet = await setService.createSet({
        number: searchTerm,
        type: type,
      });
      onSelect(newSet.number);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Select Set
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="z-[60]">
          <DialogHeader>
            <DialogTitle>Select LEGO Set</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="setNumber">Set/Part Number</Label>
              <Input
                id="setNumber"
                type="text"
                placeholder="Enter set or part number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={type === "SET" ? "default" : "outline"}
                onClick={() => setType("SET")}
              >
                Set
              </Button>
              <Button
                type="button"
                variant={type === "PART" ? "default" : "outline"}
                onClick={() => setType("PART")}
              >
                Part
              </Button>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          {createNew && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                {type} not found. Would you like to create it?
              </p>
              <Button
                variant="secondary"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading ? "Creating..." : `Create and Select ${type}`}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

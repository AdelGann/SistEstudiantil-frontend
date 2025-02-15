import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

interface DropdownComponentProps {
  items: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowData: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => { label: string; onClick: (rowData?: any) => void }[];
}

export const DropdownComponent: React.FC<DropdownComponentProps> = ({
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuItems = items({} as any); // Assuming rowData is not needed initially

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false); // Close the dropdown
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="rounded-md shadow-md p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleItemClick(item.onClick)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogProps {
  DialogTrigger: string;
  DialogTitle: string;
  DialogDescription?: string;
  width?: string;
  Children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;

  onClick?: () => void;
}

export const DialogComponent = ({ ...rest }: DialogProps) => {
  return (
    <Dialog open={rest.open} onOpenChange={rest.onOpenChange}>
      <DialogTrigger
        className="bg-black text-white rounded-md p-2"
        onClick={rest.onClick}
      >
        {rest.DialogTrigger}
      </DialogTrigger>
      <DialogContent className={`w-[${rest.width}]`}>
        <DialogHeader>
          <DialogTitle>{rest.DialogTitle}</DialogTitle>
          <DialogDescription>{rest.DialogDescription}</DialogDescription>
        </DialogHeader>
        {rest.Children}
      </DialogContent>
    </Dialog>
  );
};

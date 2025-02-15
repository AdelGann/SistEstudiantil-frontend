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
<<<<<<< HEAD
=======
  onClick?: () => void;
>>>>>>> 318badf (fix: dialog state)
}

export const DialogComponent = ({ ...rest }: DialogProps) => {
  return (
    <Dialog open={rest.open} onOpenChange={rest.onOpenChange}>
<<<<<<< HEAD
      <DialogTrigger className="bg-black text-white rounded-md p-2">
=======
      <DialogTrigger
        className="bg-black text-white rounded-md p-2"
        onClick={rest.onClick}
      >
>>>>>>> 318badf (fix: dialog state)
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

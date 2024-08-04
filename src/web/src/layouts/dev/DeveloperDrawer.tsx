import React from 'react';
import { Wrench } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useModal } from '../../components/ModalsProvider';
import { useBankVisibility, useBankVisibilityState } from '../../state/visibility';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const DeveloperDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [bankVisibility, setBankVisibility] = useBankVisibilityState();

  return (
    <>
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger>
          <Button size="icon" variant="secondary" className="absolute bottom-10 right-10 rounded-full">
            <Wrench size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-2">
          <SheetHeader>
            <SheetTitle>Developer drawer</SheetTitle>
          </SheetHeader>

          <Button onClick={() => setBankVisibility((prev) => !prev)}>{bankVisibility ? 'Close' : 'Open'} bank</Button>
          <Button>Open ATM</Button>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DeveloperDrawer;

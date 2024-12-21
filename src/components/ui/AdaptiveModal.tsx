import React from "react"
import { Button } from "./Button"
import { toast } from 'sonner';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog"

interface AdaptiveModalProps {
  drawer: {
    drawerTitle: string;
    drawerDescription: string;
    drawerOpenButtonText: string;
    drawerCloseButtonText: string;
    drawerActionButtonTextDefault: string;
  },
  dialog: {
    dialogTitle: string;
    dialogDescription: string;
    dialogOpenButtonText: string;
    dialogCloseButtonText: string;
    dialogActionButtonTextDefault: string;
  },
  onAction: () => Promise<void>;
}

const AdaptiveModal: React.FC<AdaptiveModalProps> = ({ 
  drawer, 
  dialog, 
  onAction,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(
    window.matchMedia("(max-width: 767px)").matches
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    mediaQuery.addEventListener("change", handleResize)
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  const handleAction = async () => {
    try {
      await onAction();
      setIsOpen(false);
      // toast.success("Action completed successfully");
    } catch (error) {
      console.error('Error during action:', error);
      toast.error('An error occurred during the action');
    }
  };

  return (
    <>
      {isMobile ? (
        <Drawer 
          open={isOpen} 
          onOpenChange={setIsOpen}
          shouldScaleBackground={false}
        >
          <DrawerTrigger asChild> 
            <Button variant="default" onClick={() => setIsOpen(true)}>
              {drawer.drawerOpenButtonText}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{drawer.drawerTitle}</DrawerTitle>
                <DrawerDescription>{drawer.drawerDescription}</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button 
                  className="w-full" 
                  onClick={handleAction}
                >
                  {drawer.drawerActionButtonTextDefault}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    {drawer.drawerCloseButtonText}
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <AlertDialog 
          open={isOpen} 
          onOpenChange={setIsOpen}
        >
          <AlertDialogTrigger asChild>
            <Button variant="default" onClick={() => setIsOpen(true)}>
              {dialog.dialogOpenButtonText}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialog.dialogTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {dialog.dialogDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">
                  {dialog.dialogCloseButtonText}
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild onClick={(e) => {
                e.preventDefault();
              }}>
                <Button onClick={handleAction}>
                  {dialog.dialogActionButtonTextDefault}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default AdaptiveModal
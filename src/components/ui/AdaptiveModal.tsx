import React from "react"
import { Button } from "./Button"
import { Loader2 } from "lucide-react"

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
    drawerActionButtonTextLoading: string;
  },
  dialog: {
    dialogTitle: string;
    dialogDescription: string;
    dialogOpenButtonText: string;
    dialogCloseButtonText: string;
    dialogActionButtonTextDefault: string;
    dialogActionButtonTextLoading: string;
  }
}

const AdaptiveModal: React.FC<AdaptiveModalProps> = ({ drawer, dialog }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(
    window.matchMedia("(max-width: 767px)").matches
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener("change", handleResize)
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  return isMobile ? (
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
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  // Simulate async operation
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  setIsOpen(false);
                } catch (error) {
                  console.error("Error:", error);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              <div className="flex gap-2 items-center">
                {isLoading ? `${drawer.drawerActionButtonTextLoading}` : `${drawer.drawerActionButtonTextDefault}`}
                {isLoading && <Loader2 className="animate-spin"/>}
              </div>
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full" disabled={isLoading}>
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
      onOpenChange={(open) => {
        if (!isLoading) {
          setIsOpen(open);
        }
      }}
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
            <Button 
              // Add classname fw for full width buttons
              variant="outline" 
              disabled={isLoading}
              onClick={(e) => {
                if (isLoading) {
                  e.preventDefault();
                }
              }}
            >
              {dialog.dialogCloseButtonText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={(e) => {
            // Prevent the default close behavior
            e.preventDefault();
          }}>
            <Button
              // Add classname fw for full width buttons
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  // Simulate async operation
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  setIsOpen(false);
                } catch (error) {
                  console.error("Error:", error);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              <div className="flex gap-2 items-center">
                {isLoading ? `${dialog.dialogActionButtonTextLoading}` : `${dialog.dialogActionButtonTextDefault}`}
                {isLoading && <Loader2 className="animate-spin"/>}
              </div>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AdaptiveModal
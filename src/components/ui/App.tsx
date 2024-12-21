import { useState, useEffect } from "react"
import { toast, Toaster } from "sonner"
import AdaptiveModal from "./AdaptiveModal"
import "../../styles/globals.css"

const drawerProps = {
  drawerTitle: 'Drawer Title',
  drawerDescription: 'This is a drawer description.',
  drawerOpenButtonText: 'Open Drawer',
  drawerCloseButtonText: 'Cancel',
  drawerActionButtonTextDefault: 'Commit action',
}

const dialogProps = {
  dialogTitle: 'Dialog Title',
  dialogDescription: 'This is a dialog description.',
  dialogOpenButtonText: 'Open Dialog',
  dialogCloseButtonText: 'Cancel',
  dialogActionButtonTextDefault: 'Commit action',
}

export default function App() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    mediaQuery.addEventListener("change", handleResize)
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  const handleAction = async () => {
    toast.success('Custom action has been committed')
  }

  return (
    <div role="main" aria-live="polite" className="flex flex-col min-h-screen">
      <div className="flex flex-col justify-center items-center px-4 py-20 md:px-6">
        <h1 className="mb-4 text-4xl font-bold text-center">
          Adaptive Modal Component
        </h1>
        <p className="max-w-[750px] text-center text-zinc-600 md:text-lg mb-8">
          A responsive interface component that seamlessly transforms between a centered modal on desktop and a bottom drawer on mobile devices, providing an optimal user experience across all screen sizes. Built with React, Tailwind CSS, and Radix UI primitives, inspired by and using components from <a className="underline hover:opacity-90" href="https://ui.shadcn.com/docs">shadcn/ui</a> for accessible, responsive interactions.
        </p>
        <div className="space-x-4">
          <Toaster
            position={isMobile ? "top-right" : "bottom-right"}
            theme="dark"
          />
          <AdaptiveModal
            drawer={drawerProps}
            dialog={dialogProps}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react"
import { toast, Toaster } from "sonner"
import AdaptiveModal from "./AdaptiveModal"
import { Button } from "./Button"
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
        <div className="flex items-center gap-4">
          <AdaptiveModal
            drawer={drawerProps}
            dialog={dialogProps}
            onAction={handleAction}
          />
          <Button
            variant="outline"
            asChild
          >
            <a 
              href="https://github.com/leovagostinho/adaptive-modal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <svg viewBox="0 0 24 24" className="fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View on GitHub
            </a>
          </Button>
          <Toaster
            position={isMobile ? "top-right" : "bottom-right"}
            theme="dark"
          />
        </div>
      </div>
    </div>
  )
}

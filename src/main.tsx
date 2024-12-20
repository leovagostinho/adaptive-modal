import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'

import AdaptiveModal from './components/ui/AdaptiveModal.tsx'

const drawerProps = {
  drawerTitle: 'Drawer Title test',
  drawerDescription: 'This is a drawer description.',
  drawerOpenButtonText: 'Open Drawer',
  drawerCloseButtonText: 'Cancel',
  drawerActionButtonTextDefault: 'Delete',
  drawerActionButtonTextLoading: 'Deleting'

}

const dialogProps = {
  dialogTitle: 'Dialog Title test' ,
  dialogDescription: 'This is a dialog description.',
  dialogOpenButtonText: 'Open Dialog',
  dialogCloseButtonText: 'Cancel',
  dialogActionButtonTextDefault: 'Delete',
  dialogActionButtonTextLoading: 'Deleting'
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div role="main" aria-live="polite" className="flex flex-col min-h-screen">
      <div className="flex flex-col justify-center items-center px-4 py-20 md:px-6">
        <h1 className="mb-6 w-full font-serif text-5xl font-extrabold tracking-tight text-center text-zinc-800">Adaptive Modal Component</h1>
        <p className="px-4 mb-12 max-w-2xl text-base leading-relaxed text-center text-zinc-600">
          A responsive interface component that seamlessly transforms between a centered modal on desktop and a bottom drawer on mobile devices, providing an optimal user experience across all screen sizes. Built with React, Tailwind CSS, and Radix UI primitives, inspired by and using components from <a className="underline hover:opacity-90" href="https://ui.shadcn.com/docs">shadcn/ui</a> for accessible, responsive interactions.
        </p>
        <div className="space-x-4">
          <AdaptiveModal drawer={drawerProps} dialog={dialogProps}/>
        </div>
      </div>
    </div>
  </StrictMode>,
)

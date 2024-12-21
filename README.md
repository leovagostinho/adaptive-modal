# Adaptive Modal

A responsive interface component that seamlessly transforms between a centered modal on desktop and a bottom drawer on mobile devices, providing an optimal user experience across all screen sizes. Built with React, Tailwind CSS, Radix UI primitives, and [shadcn/ui](https://ui.shadcn.com/) components.

## Features

- Automatically switches between modal and drawer based on screen size
- Smooth transitions and animations
- Fully accessible using Radix UI primitives
- Built with React and TypeScript
- Styled with Tailwind CSS
- Toast notifications using [Sonner](https://sonner.emilkowal.ski/)
- Inspired by and using components from [shadcn/ui](https://ui.shadcn.com/docs)

## Usage

```tsx
import { Toaster } from './components/ui/sonner'
import AdaptiveModal from './components/ui/AdaptiveModal'

const modalProps = {
  drawer: {
    drawerTitle: 'Drawer Title',
    drawerDescription: 'Drawer description',
    drawerOpenButtonText: 'Open Drawer',
    drawerCloseButtonText: 'Close',
    drawerActionButtonTextDefault: 'Confirm'
  },
  dialog: {
    dialogTitle: 'Dialog Title',
    dialogDescription: 'Dialog description',
    dialogOpenButtonText: 'Open Dialog',
    dialogCloseButtonText: 'Close',
    dialogActionButtonTextDefault: 'Confirm'
  }
}

function App() {
  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <AdaptiveModal 
        {...modalProps} 
        onAction={async () => {
          // Your action here
          toast.success('Action completed!')
        }}
      />
    </>
  )
}
# Adaptive Modal

A responsive interface component that seamlessly transforms between a centered modal on desktop and a bottom drawer on mobile devices, providing an optimal user experience across all screen sizes. Built with React, Tailwind CSS, and Radix UI primitives.

## Features

- Automatically switches between modal and drawer based on screen size
- Smooth transitions and animations
- Fully accessible using Radix UI primitives
- Built with React and TypeScript
- Styled with Tailwind CSS
- Inspired by and using components from [shadcn/ui](https://ui.shadcn.com/docs)

## Usage

```tsx
import AdaptiveModal from './components/ui/AdaptiveModal'

const modalProps = {
  drawer: {
    drawerTitle: 'Drawer Title',
    drawerDescription: 'Drawer description',
    drawerOpenButtonText: 'Open Drawer',
    drawerCloseButtonText: 'Close',
    drawerActionButtonTextDefault: 'Confirm',
    drawerActionButtonTextLoading: 'Confirming...'
  },
  dialog: {
    dialogTitle: 'Dialog Title',
    dialogDescription: 'Dialog description',
    dialogOpenButtonText: 'Open Dialog',
    dialogCloseButtonText: 'Close',
    dialogActionButtonTextDefault: 'Confirm',
    dialogActionButtonTextLoading: 'Confirming...'
  }
}

function App() {
  return <AdaptiveModal {...modalProps} />
}
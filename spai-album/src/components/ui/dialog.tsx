import { ReactNode } from "react"
import clsx from "clsx"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  className?: string
}

export function Dialog({ open, onOpenChange, children, className }: DialogProps) {
  if (!open) return null
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className
      )}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white p-4 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("dialog-content", className)}>{children}</div>
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("dialog-header", className)}>{children}</div>
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={clsx("dialog-title text-lg font-semibold", className)}>{children}</h2>
}

import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"

export const opts = {
  backends: [
    {
      backend: HTML5Backend,
      preview: true,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
    },
  ],
}

export const mobileWidth = 768

export const isMobile = window.screen.width <= mobileWidth

export const getBackend = () => {
  return !isMobile ? HTML5Backend : TouchBackend
}

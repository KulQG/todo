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

export const getBackend = () => {
  const screenWidth = window.screen.width

  return screenWidth > 768 ? HTML5Backend : TouchBackend
}

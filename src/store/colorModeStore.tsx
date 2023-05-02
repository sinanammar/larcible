import create from 'zustand'

interface ColorMode {
  colorMode: string
  setColorMode: (colorMode: string) => void
}

const useColorModeStore = create<ColorMode>((set) => ({
  colorMode: 'light',
  setColorMode: (colorMode: string) => set({ colorMode }),
}))

export default useColorModeStore

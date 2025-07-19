import { useScreenStore, useSlidesStore } from '@/store'
import { enterFullscreen, exitFullscreen, isFullscreen } from '@/utils/fullscreen'

export default () => {
  const screenStore = useScreenStore()
  const slidesStore = useSlidesStore()

  // Enter screening state (starting from the current page)
  const enterScreening = () => {
    enterFullscreen()
    screenStore.setScreening(true)
  }

  // Enter screening state (starting from the first page)
  const enterScreeningFromStart = () => {
    slidesStore.updateSlideIndex(0)
    enterScreening()
  }

  // Exit screening state
  const exitScreening = () => {
    screenStore.setScreening(false)
    if (isFullscreen()) exitFullscreen()
  }

  return {
    enterScreening,
    enterScreeningFromStart,
    exitScreening,
  }
}
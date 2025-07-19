import { type Ref, type ShallowRef, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import type { PPTElement } from '@/types/slides'
import { getElementRange } from '@/utils/element'

export default (elementList: Ref<PPTElement[]>, viewportRef: ShallowRef<HTMLElement | null>) => {
  const mainStore = useMainStore()
  const { canvasScale, hiddenElementIdList } = storeToRefs(mainStore)

  const mouseSelectionVisible = ref(false)
  const mouseSelectionQuadrant = ref(1)
  const mouseSelection = ref({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })

  // Update mouse selection range
  const updateMouseSelection = (e: MouseEvent) => {
    if (!viewportRef.value) return

    let isMouseDown = true
    const viewportRect = viewportRef.value.getBoundingClientRect()

    const minSelectionRange = 5
    
    const startPageX = e.pageX
    const startPageY = e.pageY

    const left = (startPageX - viewportRect.x) / canvasScale.value
    const top = (startPageY - viewportRect.y) / canvasScale.value

    // Initialize selection start position and other default values
    mouseSelection.value = {
      top: top,
      left: left,
      width: 0,
      height: 0,
    }
    mouseSelectionVisible.value = false
    mouseSelectionQuadrant.value = 4

    document.onmousemove = e => {
      if (!isMouseDown) return

      const currentPageX = e.pageX
      const currentPageY = e.pageY

      const offsetWidth = (currentPageX - startPageX) / canvasScale.value
      const offsetHeight = (currentPageY - startPageY) / canvasScale.value

      const width = Math.abs(offsetWidth)
      const height = Math.abs(offsetHeight)

      if ( width < minSelectionRange || height < minSelectionRange ) return
      
      // Determine the direction of mouse selection (moving)
      // Differentiate based on position in four quadrants, e.g., lower right is quadrant 4
      let quadrant = 0
      if ( offsetWidth > 0 && offsetHeight > 0 ) quadrant = 4
      else if ( offsetWidth < 0 && offsetHeight < 0 ) quadrant = 2
      else if ( offsetWidth > 0 && offsetHeight < 0 ) quadrant = 1
      else if ( offsetWidth < 0 && offsetHeight > 0 ) quadrant = 3

      // Update selection range
      mouseSelection.value = {
        ...mouseSelection.value,
        width: width,
        height: height,
      }
      mouseSelectionVisible.value = true
      mouseSelectionQuadrant.value = quadrant
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      isMouseDown = false

      // Calculate which elements in the canvas are within the mouse selection range and set them to selected state
      let inRangeElementList: PPTElement[] = []
      for (let i = 0; i < elementList.value.length; i++) {
        const element = elementList.value[i]
        const mouseSelectionLeft = mouseSelection.value.left
        const mouseSelectionTop = mouseSelection.value.top
        const mouseSelectionWidth = mouseSelection.value.width
        const mouseSelectionHeight = mouseSelection.value.height

        const { minX, maxX, minY, maxY } = getElementRange(element)

        // The calculation for whether an element is within the selection range differs based on the four selection directions
        let isInclude = false
        if (mouseSelectionQuadrant.value === 4) {
          isInclude = minX > mouseSelectionLeft && 
                      maxX < mouseSelectionLeft + mouseSelectionWidth && 
                      minY > mouseSelectionTop && 
                      maxY < mouseSelectionTop + mouseSelectionHeight
        }
        else if (mouseSelectionQuadrant.value === 2) {
          isInclude = minX > (mouseSelectionLeft - mouseSelectionWidth) && 
                      maxX < (mouseSelectionLeft - mouseSelectionWidth) + mouseSelectionWidth && 
                      minY > (mouseSelectionTop - mouseSelectionHeight) && 
                      maxY < (mouseSelectionTop - mouseSelectionHeight) + mouseSelectionHeight
        }
        else if (mouseSelectionQuadrant.value === 1) {
          isInclude = minX > mouseSelectionLeft && 
                      maxX < mouseSelectionLeft + mouseSelectionWidth && 
                      minY > (mouseSelectionTop - mouseSelectionHeight) && 
                      maxY < (mouseSelectionTop - mouseSelectionHeight) + mouseSelectionHeight
        }
        else if (mouseSelectionQuadrant.value === 3) {
          isInclude = minX > (mouseSelectionLeft - mouseSelectionWidth) && 
                      maxX < (mouseSelectionLeft - mouseSelectionWidth) + mouseSelectionWidth && 
                      minY > mouseSelectionTop && 
                      maxY < mouseSelectionTop + mouseSelectionHeight
        }

        // Locked or hidden elements, even if within range, should not be set to selected state
        if (isInclude && !element.lock && !hiddenElementIdList.value.includes(element.id)) inRangeElementList.push(element)
      }

      // If there are members of a group element within the range, all members of that group must be within the range to be selected
      inRangeElementList = inRangeElementList.filter(inRangeElement => {
        if (inRangeElement.groupId) {
          const inRangeElementIdList = inRangeElementList.map(inRangeElement => inRangeElement.id)
          const groupElementList = elementList.value.filter(element => element.groupId === inRangeElement.groupId)
          return groupElementList.every(groupElement => inRangeElementIdList.includes(groupElement.id))
        }
        return true
      })
      const inRangeElementIdList = inRangeElementList.map(inRangeElement => inRangeElement.id)
      mainStore.setActiveElementIdList(inRangeElementIdList)

      mouseSelectionVisible.value = false
    }
  }

  return {
    mouseSelection,
    mouseSelectionVisible,
    mouseSelectionQuadrant,
    updateMouseSelection,
  }
}
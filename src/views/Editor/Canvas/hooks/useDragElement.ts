import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore, useSlidesStore, useKeyboardStore } from '@/store'
import type { PPTElement } from '@/types/slides'
import type { AlignmentLineProps } from '@/types/edit'
import { getRectRotatedRange, uniqAlignLines, type AlignLine } from '@/utils/element'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'

export default (
  elementList: Ref<PPTElement[]>,
  alignmentLines: Ref<AlignmentLineProps[]>,
  canvasScale: Ref<number>,
) => {
  const slidesStore = useSlidesStore()
  const { activeElementIdList, activeGroupElementId } = storeToRefs(useMainStore())
  const { shiftKeyState } = storeToRefs(useKeyboardStore())
  const { viewportRatio, viewportSize } = storeToRefs(slidesStore)

  const { addHistorySnapshot } = useHistorySnapshot()

  // Handles the dragging of an element on the canvas.
  const dragElement = (e: MouseEvent | TouchEvent, element: PPTElement) => {
    const isTouchEvent = !(e instanceof MouseEvent)
    if (isTouchEvent && (!e.changedTouches || !e.changedTouches[0])) return

    // Only proceed if the dragged element is within the active selection.
    if (!activeElementIdList.value.includes(element.id)) return
    let isMouseDown = true

    const edgeWidth = viewportSize.value // Width of the visible viewport
    const edgeHeight = viewportSize.value * viewportRatio.value // Height of the visible viewport
    
    // Defines the range within which elements will snap to alignment lines.
    const sorptionRange = 5

    // Store the initial state of elements for history tracking and calculations.
    const originElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList.value))
    const originActiveElementList = originElementList.filter(el => activeElementIdList.value.includes(el.id))
  
    // Store the initial properties of the dragged element.
    const elOriginLeft = element.left
    const elOriginTop = element.top
    const elOriginWidth = element.width
    const elOriginHeight = ('height' in element && element.height) ? element.height : 0
    const elOriginRotate = ('rotate' in element && element.rotate) ? element.rotate : 0
  
    // Get the starting coordinates of the drag event.
    const startPageX = isTouchEvent ? e.changedTouches[0].pageX : e.pageX
    const startPageY = isTouchEvent ? e.changedTouches[0].pageY : e.pageY

    let isMisoperation: boolean | null = null // Flag to track if the drag is a misoperation (too small movement).

    const isActiveGroupElement = element.id === activeGroupElementId.value // Check if the dragged element is part of an active group.

    // Collect alignment lines from other elements on the canvas.
    // This includes the top, bottom, left, right edges, and center points of other elements.
    // Rotated elements and lines require recalculating their bounding boxes.
    let horizontalLines: AlignLine[] = []
    let verticalLines: AlignLine[] = []

    for (const el of elementList.value) {
      if (el.type === 'line') continue // Skip lines as they don't have standard snap points.
      if (isActiveGroupElement && el.id === element.id) continue // Skip the element being dragged if it's part of a group.
      if (!isActiveGroupElement && activeElementIdList.value.includes(el.id)) continue // Skip other active elements if not dragging a group.

      let left, top, width, height
      if ('rotate' in el && el.rotate) {
        // Calculate the bounding box for rotated elements.
        const { xRange, yRange } = getRectRotatedRange({
          left: el.left,
          top: el.top,
          width: el.width,
          height: el.height,
          rotate: el.rotate,
        })
        left = xRange[0]
        top = yRange[0]
        width = xRange[1] - xRange[0]
        height = yRange[1] - yRange[0]
      }
      else {
        // Use standard properties for non-rotated elements.
        left = el.left
        top = el.top
        width = el.width
        height = el.height
      }
      
      const right = left + width
      const bottom = top + height
      const centerX = top + height / 2 // Vertical center line
      const centerY = left + width / 2 // Horizontal center line

      // Define the snap lines for the current element.
      const topLine: AlignLine = { value: top, range: [left, right] }
      const bottomLine: AlignLine = { value: bottom, range: [left, right] }
      const horizontalCenterLine: AlignLine = { value: centerX, range: [left, right] }
      const leftLine: AlignLine = { value: left, range: [top, bottom] }
      const rightLine: AlignLine = { value: right, range: [top, bottom] }
      const verticalCenterLine: AlignLine = { value: centerY, range: [top, bottom] }

      // Add horizontal and vertical snap lines.
      horizontalLines.push(topLine, bottomLine, horizontalCenterLine)
      verticalLines.push(leftLine, rightLine, verticalCenterLine)
    }

    // Add snap lines for the canvas viewport edges and centers.
    const edgeTopLine: AlignLine = { value: 0, range: [0, edgeWidth] }
    const edgeBottomLine: AlignLine = { value: edgeHeight, range: [0, edgeWidth] }
    const edgeHorizontalCenterLine: AlignLine = { value: edgeHeight / 2, range: [0, edgeWidth] }
    const edgeLeftLine: AlignLine = { value: 0, range: [0, edgeHeight] }
    const edgeRightLine: AlignLine = { value: edgeWidth, range: [0, edgeHeight] }
    const edgeVerticalCenterLine: AlignLine = { value: edgeWidth / 2, range: [0, edgeHeight] }

    horizontalLines.push(edgeTopLine, edgeBottomLine, edgeHorizontalCenterLine)
    verticalLines.push(edgeLeftLine, edgeRightLine, edgeVerticalCenterLine)
    
    // Remove duplicate snap lines.
    horizontalLines = uniqAlignLines(horizontalLines)
    verticalLines = uniqAlignLines(verticalLines)

    // Handles the movement of the element during drag.
    const handleMousemove = (e: MouseEvent | TouchEvent) => {
      const currentPageX = isTouchEvent ? (e as TouchEvent).changedTouches[0].pageX : (e as MouseEvent).pageX
      const currentPageY = isTouchEvent ? (e as TouchEvent).changedTouches[0].pageY : (e as MouseEvent).pageY

      // Detect misoperation: if the movement is too small, consider it a misoperation.
      if (isMisoperation !== false) {
        isMisoperation = Math.abs(startPageX - currentPageX) < sorptionRange && 
                         Math.abs(startPageY - currentPageY) < sorptionRange
      }
      if (!isMouseDown || isMisoperation) return
      
      // Calculate the movement delta, scaled by the canvas scale.
      let moveX = (currentPageX - startPageX) / canvasScale.value
      let moveY = (currentPageY - startPageY) / canvasScale.value

      // If Shift key is pressed, snap movement to horizontal or vertical.
      if (shiftKeyState.value) {
        if (Math.abs(moveX) > Math.abs(moveY)) moveY = 0
        else moveX = 0
      }

      // Calculate the target position of the elements.
      let targetLeft = elOriginLeft + moveX
      let targetTop = elOriginTop + moveY

      // Determine the bounding box of the target elements for snapping.
      // This differs for single elements, grouped elements, and multiple selected elements.
      let targetMinX: number, targetMaxX: number, targetMinY: number, targetMaxY: number

      if (activeElementIdList.value.length === 1 || isActiveGroupElement) {
        // Single element or a group (treated as a single element for bounding box calculation).
        if (elOriginRotate) {
          // Calculate bounding box for a rotated single element.
          const { xRange, yRange } = getRectRotatedRange({
            left: targetLeft,
            top: targetTop,
            width: elOriginWidth,
            height: elOriginHeight,
            rotate: elOriginRotate,
          })
          targetMinX = xRange[0]
          targetMaxX = xRange[1]
          targetMinY = yRange[0]
          targetMaxY = yRange[1]
        }
        else if (element.type === 'line') {
          // Calculate bounding box for a line.
          targetMinX = targetLeft
          targetMaxX = targetLeft + Math.max(element.start[0], element.end[0])
          targetMinY = targetTop
          targetMaxY = targetTop + Math.max(element.start[1], element.end[1])
        }
        else {
          // Standard bounding box for non-rotated, non-line elements.
          targetMinX = targetLeft
          targetMaxX = targetLeft + elOriginWidth
          targetMinY = targetTop
          targetMaxY = targetTop + elOriginHeight
        }
      }
      else {
        // Multiple selected elements: calculate the combined bounding box.
        const leftValues = []
        const topValues = []
        const rightValues = []
        const bottomValues = []
        
        for (let i = 0; i < originActiveElementList.length; i++) {
          const element = originActiveElementList[i]
          const left = element.left + moveX
          const top = element.top + moveY
          const width = element.width
          const height = ('height' in element && element.height) ? element.height : 0
          const rotate = ('rotate' in element && element.rotate) ? element.rotate : 0

          if ('rotate' in element && element.rotate) {
            // Calculate bounding box for rotated elements within the selection.
            const { xRange, yRange } = getRectRotatedRange({ left, top, width, height, rotate })
            leftValues.push(xRange[0])
            topValues.push(yRange[0])
            rightValues.push(xRange[1])
            bottomValues.push(yRange[1])
          }
          else if (element.type === 'line') {
            // Calculate bounding box for lines within the selection.
            leftValues.push(left)
            topValues.push(top)
            rightValues.push(left + Math.max(element.start[0], element.end[0]))
            bottomValues.push(top + Math.max(element.start[1], element.end[1]))
          }
          else {
            // Standard bounding box for non-rotated elements within the selection.
            leftValues.push(left)
            topValues.push(top)
            rightValues.push(left + width)
            bottomValues.push(top + height)
          }
        }

        targetMinX = Math.min(...leftValues)
        targetMaxX = Math.max(...rightValues)
        targetMinY = Math.min(...topValues)
        targetMaxY = Math.max(...bottomValues)
      }
      
      // Calculate the center points of the target bounding box.
      const targetCenterX = targetMinX + (targetMaxX - targetMinX) / 2
      const targetCenterY = targetMinY + (targetMaxY - targetMinY) / 2

      // Check for snapping to alignment lines.
      // Snapping occurs if the difference between the target element's boundary and an alignment line is within sorptionRange.
      // If a snap occurs, adjust the element's position and draw an alignment line.
      const _alignmentLines: AlignmentLineProps[] = []
      let isVerticalAdsorbed = false
      let isHorizontalAdsorbed = false
      for (let i = 0; i < horizontalLines.length; i++) {
        const { value, range } = horizontalLines[i]
        const min = Math.min(...range, targetMinX, targetMaxX)
        const max = Math.max(...range, targetMinX, targetMaxX)
        
        // Check snapping for top edge.
        if (Math.abs(targetMinY - value) < sorptionRange && !isHorizontalAdsorbed) {
          targetTop = targetTop - (targetMinY - value) // Adjust top position.
          isHorizontalAdsorbed = true
          _alignmentLines.push({type: 'horizontal', axis: {x: min - 50, y: value}, length: max - min + 100}) // Add alignment line.
        }
        // Check snapping for bottom edge.
        if (Math.abs(targetMaxY - value) < sorptionRange && !isHorizontalAdsorbed) {
          targetTop = targetTop - (targetMaxY - value) // Adjust top position.
          isHorizontalAdsorbed = true
          _alignmentLines.push({type: 'horizontal', axis: {x: min - 50, y: value}, length: max - min + 100}) // Add alignment line.
        }
        // Check snapping for vertical center.
        if (Math.abs(targetCenterY - value) < sorptionRange && !isHorizontalAdsorbed) {
          targetTop = targetTop - (targetCenterY - value) // Adjust top position.
          isHorizontalAdsorbed = true
          _alignmentLines.push({type: 'horizontal', axis: {x: min - 50, y: value}, length: max - min + 100}) // Add alignment line.
        }
      }
      for (let i = 0; i < verticalLines.length; i++) {
        const { value, range } = verticalLines[i]
        const min = Math.min(...range, targetMinY, targetMaxY)
        const max = Math.max(...range, targetMinY, targetMaxY)

        // Check snapping for left edge.
        if (Math.abs(targetMinX - value) < sorptionRange && !isVerticalAdsorbed) {
          targetLeft = targetLeft - (targetMinX - value) // Adjust left position.
          isVerticalAdsorbed = true
          _alignmentLines.push({type: 'vertical', axis: {x: value, y: min - 50}, length: max - min + 100}) // Add alignment line.
        }
        // Check snapping for right edge.
        if (Math.abs(targetMaxX - value) < sorptionRange && !isVerticalAdsorbed) {
          targetLeft = targetLeft - (targetMaxX - value) // Adjust left position.
          isVerticalAdsorbed = true
          _alignmentLines.push({type: 'vertical', axis: {x: value, y: min - 50}, length: max - min + 100}) // Add alignment line.
        }
        // Check snapping for horizontal center.
        if (Math.abs(targetCenterX - value) < sorptionRange && !isVerticalAdsorbed) {
          targetLeft = targetLeft - (targetCenterX - value) // Adjust left position.
          isVerticalAdsorbed = true
          _alignmentLines.push({type: 'vertical', axis: {x: value, y: min - 50}, length: max - min + 100}) // Add alignment line.
        }
      }
      alignmentLines.value = _alignmentLines // Update the displayed alignment lines.
      
      // Update the positions of the elements.
      if (activeElementIdList.value.length === 1 || isActiveGroupElement) {
        // Only update the position of the currently dragged element.
        elementList.value = elementList.value.map(el => {
          return el.id === element.id ? { ...el, left: targetLeft, top: targetTop } : el
        })
      }
      else {
        // For multiple selected elements, update all active elements based on the movement of the dragged element.
        const handleElement = elementList.value.find(el => el.id === element.id)
        if (!handleElement) return

        elementList.value = elementList.value.map(el => {
          if (activeElementIdList.value.includes(el.id)) {
            if (el.id === element.id) {
              // Set the position of the dragged element.
              return {
                ...el,
                left: targetLeft,
                top: targetTop,
              }
            }
            // Adjust the position of other selected elements proportionally.
            return {
              ...el,
              left: el.left + (targetLeft - handleElement.left),
              top: el.top + (targetTop - handleElement.top),
            }
          }
          return el
        })
      }
    }

    // Handles the end of the drag operation.
    const handleMouseup = (e: MouseEvent | TouchEvent) => {
      isMouseDown = false
      
      // Remove event listeners.
      document.ontouchmove = null
      document.ontouchend = null
      document.onmousemove = null
      document.onmouseup = null

      alignmentLines.value = [] // Clear displayed alignment lines.

      const currentPageX = isTouchEvent ? (e as TouchEvent).changedTouches[0].pageX : (e as MouseEvent).pageX
      const currentPageY = isTouchEvent ? (e as TouchEvent).changedTouches[0].pageY : (e as MouseEvent).pageY

      // If no movement occurred, do nothing.
      if (startPageX === currentPageX && startPageY === currentPageY) return

      // Save the updated elements to the slide and add to history.
      slidesStore.updateSlide({ elements: elementList.value })
      addHistorySnapshot()
    }

    // Attach event listeners based on the input event type (mouse or touch).
    if (isTouchEvent) {
      document.ontouchmove = handleMousemove
      document.ontouchend = handleMouseup
    }
    else {
      document.onmousemove = handleMousemove
      document.onmouseup = handleMouseup
    }
  }

  return {
    dragElement,
  }
}
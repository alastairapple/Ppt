import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import type { PPTElement } from '@/types/slides'
import { ElementOrderCommands } from '@/types/edit'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'

export default () => {
  const slidesStore = useSlidesStore()
  const { currentSlide } = storeToRefs(slidesStore)

  const { addHistorySnapshot } = useHistorySnapshot()

  /**
   * Get the level range of grouped elements
   * @param elementList All elements on this page
   * @param combineElementList List of grouped elements
   */
  const getCombineElementLevelRange = (elementList: PPTElement[], combineElementList: PPTElement[]) => {
    return {
      minLevel: elementList.findIndex(_element => _element.id === combineElementList[0].id),
      maxLevel: elementList.findIndex(_element => _element.id === combineElementList[combineElementList.length - 1].id),
    }
  }

  /**
   * Move up one layer
   * @param elementList All elements on this page
   * @param element The element being operated on
   */
  const moveUpElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    // If the operated element is a member of a group, all members of the group need to be moved together
    if (element.groupId) {

      // Get all members of the group and the level range of all members
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel, maxLevel } = getCombineElementLevelRange(elementList, combineElementList)

      // Already at the top layer, cannot move further
      if (maxLevel === elementList.length - 1) return

      // Get the element above the group by using the maximum level of the group members, then remove the group element from the element list (and cache the removed element list)
      // If the element above is in another group, insert the removed group element above that upper group
      // If the element above is not in any group, insert the removed group element above that upper element
      const nextElement = copyOfElementList[maxLevel + 1]
      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)

      if (nextElement.groupId) {
        const nextCombineElementList = copyOfElementList.filter(_element => _element.groupId === nextElement.groupId)
        copyOfElementList.splice(minLevel + nextCombineElementList.length, 0, ...movedElementList)
      }
      else copyOfElementList.splice(minLevel + 1, 0, ...movedElementList)
    }

    // If the operated element is not a member of a group
    else {

      // Get the level of the element in the list
      const level = elementList.findIndex(item => item.id === element.id)

      // Already at the top layer, cannot move further
      if (level === elementList.length - 1) return

      // Get the element above the group, then remove the group element from the element list (and cache the removed element list)
      const nextElement = copyOfElementList[level + 1]
      const movedElement = copyOfElementList.splice(level, 1)[0]

      // Get the element above the group by using the maximum level of the group members, then remove the group element from the element list (and cache the removed element list)
      // If the element above is in another group, insert the removed group element above that upper group
      // If the element above is not in any group, insert the removed group element above that upper element
      if (nextElement.groupId) {
        const combineElementList = copyOfElementList.filter(_element => _element.groupId === nextElement.groupId)
        copyOfElementList.splice(level + combineElementList.length, 0, movedElement)
      }
      else copyOfElementList.splice(level + 1, 0, movedElement)
    }

    return copyOfElementList
  }

  /**
   * Move down one layer, operation is the same as moving up
   * @param elementList All elements on this page
   * @param element The element being operated on
   */
  const moveDownElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    if (element.groupId) {
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel } = getCombineElementLevelRange(elementList, combineElementList)
      if (minLevel === 0) return

      const prevElement = copyOfElementList[minLevel - 1]
      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)

      if (prevElement.groupId) {
        const prevCombineElementList = copyOfElementList.filter(_element => _element.groupId === prevElement.groupId)
        copyOfElementList.splice(minLevel - prevCombineElementList.length, 0, ...movedElementList)
      }
      else copyOfElementList.splice(minLevel - 1, 0, ...movedElementList)
    }

    else {
      const level = elementList.findIndex(item => item.id === element.id)
      if (level === 0) return

      const prevElement = copyOfElementList[level - 1]
      const movedElement = copyOfElementList.splice(level, 1)[0]

      if (prevElement.groupId) {
        const combineElementList = copyOfElementList.filter(_element => _element.groupId === prevElement.groupId)
        copyOfElementList.splice(level - combineElementList.length, 0, movedElement)
      }
      else copyOfElementList.splice(level - 1, 0, movedElement)
    }

    return copyOfElementList
  }

  /**
   * Bring to top
   * @param elementList All elements on this page
   * @param element The element being operated on
   */
  const moveTopElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    // If the operated element is a member of a group, all members of the group need to be moved together
    if (element.groupId) {

      // Get all members of the group and the level range of all members
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel, maxLevel } = getCombineElementLevelRange(elementList, combineElementList)

      // Already at the top layer, cannot move further
      if (maxLevel === elementList.length - 1) return null

      // Remove the group element from the element list, then add the removed elements to the top of the element list
      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)
      copyOfElementList.push(...movedElementList)
    }

    // If the operated element is not a member of a group
    else {

      // Get the level of the element in the list
      const level = elementList.findIndex(item => item.id === element.id)

      // Already at the top layer, cannot move further
      if (level === elementList.length - 1) return null

      // Remove the group element from the element list, then add the removed element to the bottom of the element list
      copyOfElementList.splice(level, 1)
      copyOfElementList.push(element)
    }

    return copyOfElementList
  }

  /**
   * Bring to bottom, operation is the same as bringing to top
   * @param elementList All elements on this page
   * @param element The element being operated on
   */
  const moveBottomElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    if (element.groupId) {
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel } = getCombineElementLevelRange(elementList, combineElementList)
      if (minLevel === 0) return

      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)
      copyOfElementList.unshift(...movedElementList)
    }

    else {
      const level = elementList.findIndex(item => item.id === element.id)
      if (level === 0) return

      copyOfElementList.splice(level, 1)
      copyOfElementList.unshift(element)
    }

    return copyOfElementList
  }

  /**
   * Adjust element level
   * @param element The element whose level needs to be adjusted
   * @param command Adjustment command: move up, move down, bring to top, bring to bottom
   */
  const orderElement = (element: PPTElement, command: ElementOrderCommands) => {
    let newElementList
    
    if (command === ElementOrderCommands.UP) newElementList = moveUpElement(currentSlide.value.elements, element)
    else if (command === ElementOrderCommands.DOWN) newElementList = moveDownElement(currentSlide.value.elements, element)
    else if (command === ElementOrderCommands.TOP) newElementList = moveTopElement(currentSlide.value.elements, element)
    else if (command === ElementOrderCommands.BOTTOM) newElementList = moveBottomElement(currentSlide.value.elements, element)

    if (!newElementList) return

    slidesStore.updateSlide({ elements: newElementList })
    addHistorySnapshot()
  }

  return {
    orderElement,
  }
}
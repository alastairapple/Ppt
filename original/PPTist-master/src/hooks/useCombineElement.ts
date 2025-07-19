import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { nanoid } from 'nanoid'
import { useMainStore, useSlidesStore } from '@/store'
import type { PPTElement } from '@/types/slides'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'

export default () => {
  const mainStore = useMainStore()
  const slidesStore = useSlidesStore()
  const { activeElementIdList, activeElementList, handleElementId } = storeToRefs(mainStore)
  const { currentSlide } = storeToRefs(slidesStore)

  const { addHistorySnapshot } = useHistorySnapshot()

  /**
   * Determines if the currently selected elements can be combined.
   */
  const canCombine = computed(() => {
    if (activeElementList.value.length < 2) return false

    const firstGroupId = activeElementList.value[0].groupId
    if (!firstGroupId) return true

    const inSameGroup = activeElementList.value.every(el => (el.groupId && el.groupId) === firstGroupId)
    return !inSameGroup
  })

  /**
   * Combines the currently selected elements: assigns a common group ID to the selected elements.
   */
  const combineElements = () => {
    if (!activeElementList.value.length) return

    // Generate a new element list for subsequent operations
    let newElementList: PPTElement[] = JSON.parse(JSON.stringify(currentSlide.value.elements))

    // Generate group ID
    const groupId = nanoid(10)

    // Collect the list of elements to be combined and assign a unique group ID
    const combineElementList: PPTElement[] = []
    for (const element of newElementList) {
      if (activeElementIdList.value.includes(element.id)) {
        element.groupId = groupId
        combineElementList.push(element)
      }
    }

    // Ensure that all members of the group are contiguous in their layering. The method is as follows:
    // First, get the layering of the topmost element within the group, remove the elements to be combined from the new element list,
    // and then insert the collected elements to be combined back into the new element list at the appropriate position based on the topmost element's layering.
    const combineElementMaxLevel = newElementList.findIndex(_element => _element.id === combineElementList[combineElementList.length - 1].id)
    const combineElementIdList = combineElementList.map(_element => _element.id)
    newElementList = newElementList.filter(_element => !combineElementIdList.includes(_element.id))

    const insertLevel = combineElementMaxLevel - combineElementList.length + 1
    newElementList.splice(insertLevel, 0, ...combineElementList)

    slidesStore.updateSlide({ elements: newElementList })
    addHistorySnapshot()
  }

  /**
   * Uncombines elements: removes the group ID from the selected elements.
   */
  const uncombineElements = () => {
    if (!activeElementList.value.length) return
    const hasElementInGroup = activeElementList.value.some(item => item.groupId)
    if (!hasElementInGroup) return
    
    const newElementList: PPTElement[] = JSON.parse(JSON.stringify(currentSlide.value.elements))
    for (const element of newElementList) {
      if (activeElementIdList.value.includes(element.id) && element.groupId) delete element.groupId
    }
    slidesStore.updateSlide({ elements: newElementList })

    // After uncombining, the active element status needs to be reset
    // By default, reset to the element currently being operated. If it doesn't exist, reset to empty.
    const handleElementIdList = handleElementId.value ? [handleElementId.value] : []
    mainStore.setActiveElementIdList(handleElementIdList)

    addHistorySnapshot()
  }

  return {
    canCombine,
    combineElements,
    uncombineElements,
  }
}
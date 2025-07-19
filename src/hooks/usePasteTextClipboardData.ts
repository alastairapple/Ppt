import { storeToRefs } from 'pinia'
import { useKeyboardStore } from '@/store'
import { pasteCustomClipboardString } from '@/utils/clipboard'
import { parseText2Paragraphs } from '@/utils/textParser'
import { getImageDataURL, isSVGString, svg2File } from '@/utils/image'
import { isValidURL } from '@/utils/common'
import useCreateElement from '@/hooks/useCreateElement'
import useAddSlidesOrElements from '@/hooks/useAddSlidesOrElements'

interface PasteTextClipboardDataOptions {
  onlySlide?: boolean
  onlyElements?: boolean
}

/**
 * Check if it's a valid image URL string
 * 
 * !!!Note: You need to determine which sources of image URLs are allowed to be matched and write your own regular expression.
 * !!!It is essential to ensure that all image sources are legal, reliable, controllable, and have no access restrictions.
 */
const isValidImgURL = (url: string) => {
  const pexels = /^https?:\/\/(?:[a-zA-Z0-9-]+\.)*pexels\.com\/[^\s]+\.(?:jpg|jpeg|png|svg|webp)(?:\?.*)?$/i.test(url)
  const pptist = /^https?:\/\/(?:[a-zA-Z0-9-]+\.)*pptist\.cn\/[^\s]+\.(?:jpg|jpeg|png|svg|webp)(?:\?.*)?$/i.test(url)
  return pexels || pptist
}

export default () => {
  const { shiftKeyState } = storeToRefs(useKeyboardStore())

  const { createTextElement, createImageElement } = useCreateElement()
  const { addElementsFromData, addSlidesFromData } = useAddSlidesOrElements()

  /**
   * Paste plain text: create as a new text element
   * @param text Text
   */
  const createTextElementFromClipboard = (text: string) => {
    createTextElement({
      left: 0,
      top: 0,
      width: 600,
      height: 50,
    }, { content: text })
  }

  /**
   * Parse clipboard content and choose the appropriate paste method based on the parsed result
   * @param text Clipboard content
   * @param options Configuration items: onlySlide -- only process slide paste; onlyElements -- only process element paste;
   */
  const pasteTextClipboardData = (text: string, options?: PasteTextClipboardDataOptions) => {
    const onlySlide = options?.onlySlide || false
    const onlyElements = options?.onlyElements || false

    const clipboardData = pasteCustomClipboardString(text)

    // Elements or slides
    if (typeof clipboardData === 'object') {
      const { type, data } = clipboardData

      if (type === 'elements' && !onlySlide) addElementsFromData(data)
      else if (type === 'slides' && !onlyElements) addSlidesFromData(data)
    }

    // Plain text
    else if (!onlyElements && !onlySlide) {
      // Plain text
      if (shiftKeyState.value) {
        const string = parseText2Paragraphs(clipboardData)
        createTextElementFromClipboard(string)
      }
      else {
        // Attempt to check if it's an image URL link
        if (isValidImgURL(clipboardData)) {
          createImageElement(clipboardData)
        }
        // Attempt to check if it's a hyperlink
        else if (isValidURL(clipboardData)) {
          createTextElementFromClipboard(`<a href="${clipboardData}" title="${clipboardData}" target="_blank">${clipboardData}</a>`)
        }
        // Attempt to check if it's SVG code
        else if (isSVGString(clipboardData)) {
          const file = svg2File(clipboardData)
          getImageDataURL(file).then(dataURL => createImageElement(dataURL))
        }
        // Plain text
        else {
          const string = parseText2Paragraphs(clipboardData)
          createTextElementFromClipboard(string)
        }
      }
    }
  }

  return {
    pasteTextClipboardData,
  }
}
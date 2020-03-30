class Create {
  /**
   * @param {{ appendChild: (arg0: HTMLElement) => void; }} appendTo
   */
  constructor(appendTo, className = '', idName = '', elementType = 'div') {
    const element = document.createElement(elementType);
    if (className !== '') element.className = className;
    if (idName !== '') element.id = idName;
    if (appendTo != null) appendTo.appendChild(element);
    return element;
  }
}

export default Create;

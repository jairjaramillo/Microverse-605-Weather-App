const Create = (appendTo, className = '', idName = '', elementType = 'div') => {
  const element = document.createElement(elementType);
  if (className !== '') element.className = className;
  if (idName !== '') element.id = idName;
  if (appendTo != null) appendTo.appendChild(element);
  return element;
};

export default Create;

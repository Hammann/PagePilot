let selectedElement = null;
let mouseDownTimer = null;

document.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return; // Only respond to left-click

  const line = e.target.closest('p, div, li, tr');
  if (!line || !line.parentElement) return;

  mouseDownTimer = setTimeout(() => {
    if (line === selectedElement) {
      clearHighlights();
    } else {
      clearHighlights();
      selectedElement = line;
      highlightElement(selectedElement);
    }
  }, 750);
});

document.addEventListener('mouseup', () => {
  clearTimeout(mouseDownTimer);
});

document.addEventListener('keydown', (e) => {
    if (!selectedElement) return;
  
    let nextElement = null;
  
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextElement = findVisibleSibling(selectedElement, 'previous');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextElement = findVisibleSibling(selectedElement, 'next');
    }
  
    if (nextElement) {
      clearHighlights();
      selectedElement = nextElement;
      highlightElement(selectedElement);
    }
  });  

function clearHighlights() {
  if (selectedElement) {
    selectedElement.style.outline = '';
    selectedElement = null;
  }
}

function highlightElement(el) {
  el.style.outline = '2px solid orange';
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'center' // keep it near the middle of the screen
  });
}

function findVisibleSibling(startElem, direction) {
    const getSibling = direction === 'next'
      ? (el) => el.nextElementSibling
      : (el) => el.previousElementSibling;
  
    let current = getSibling(startElem);
  
    while (current) {
      const tagMatch = ['P', 'DIV', 'LI', 'TR'].includes(current.tagName.toUpperCase());
  
      const style = window.getComputedStyle(current);
      const isVisible = style.display !== 'none' &&
                        style.visibility !== 'hidden' &&
                        current.getClientRects().length > 0;
  
      if (tagMatch && isVisible) {
        return current;
      }
  
      current = getSibling(current);
    }
  
    return null;
  }
  

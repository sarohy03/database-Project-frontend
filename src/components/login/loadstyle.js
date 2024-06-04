// loadStyles.js
export const loadStyles = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.id = 'dynamic-bootstrap-css';
    document.head.appendChild(link);
  };
  
export const unloadStyles = (id) => {
    const link = document.getElementById(id);
    if (link) {
      document.head.removeChild(link);
    }
  };
  
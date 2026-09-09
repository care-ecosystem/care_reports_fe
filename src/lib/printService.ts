/**
 * Trigger browser print dialog for current page
 */
export const printReport = (): void => {
  // Apply print-specific styles
  document.body.classList.add("printing");

  // Trigger browser print dialog
  window.print();

  // Remove print class after printing
  setTimeout(() => {
    document.body.classList.remove("printing");
  }, 1000);
};

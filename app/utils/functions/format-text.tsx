// Description: Utility function to capitalize the first letter of a string
export function capitalizeFirstLetter(text: string): string {
   if (!text) return text;
   return text.charAt(0).toUpperCase() + text.slice(1);
}
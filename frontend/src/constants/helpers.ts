export function clipResponse(
  text: string,
  delimiter: string,
  wordLimit: number
) {
  // Check if the delimiter is present
  const delimiterIndex = text.indexOf(delimiter);
  let clippedText;

  if (delimiterIndex !== -1) {
    // If delimiter is found, clip the text at the delimiter
    clippedText = text.substring(0, delimiterIndex).trim();
  } else {
    // If delimiter is not found, clip the text at word limit
    const words = text.split(/\s+/); // Split text by whitespace
    clippedText = words.slice(0, wordLimit).join(' '); // Join the first `wordLimit` words
  }

  return clippedText;
}

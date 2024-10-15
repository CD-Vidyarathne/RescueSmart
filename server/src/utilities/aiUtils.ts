export function generatePrompt(p: string, l: string): string {
  const prompt = `30-50 word response on topic "${p}" : location - ${l} , Sri Lanka`;
  return prompt;
}

export function generatePrompt(
  p: string,
  l: string = "",
  s: string = "",
): string {
  const prompt = `30-50 word response on topic "${p} :situation - ${s} ,location - ${l} , Sri Lanka"`;
  return prompt;
}

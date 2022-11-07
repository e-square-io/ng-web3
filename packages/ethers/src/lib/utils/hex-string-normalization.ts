export function hexStringNormalization(value: string): string {
  return value.startsWith('0x') ? value : `0x${value}`;
}

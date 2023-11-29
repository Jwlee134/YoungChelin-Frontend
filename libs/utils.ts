export function cls(...rest: string[]) {
  return rest.join(" ");
}

export function handleConsonant(name: string) {
  const charCode = name.charCodeAt(name.length - 1);
  const consonantCode = (charCode - 44032) % 28;
  if (consonantCode === 0) return `${name}를`;
  return `${name}을`;
}

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });
}

export async function getFileFromBase64(id: number, url: string) {
  return await fetch(url)
    .then((res) => res.blob())
    .then((blob) => new File([blob], `${id}-thumbnail`, { type: blob.type }));
}

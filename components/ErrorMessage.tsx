export default function ErrorMessage({ text }: { text: string }) {
  return <p className="text-xs text-red-500 my-2">{text}</p>;
}

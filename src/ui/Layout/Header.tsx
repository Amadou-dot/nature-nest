export default function Header({ className }: { className: string }) {
  return <header className={`${className} text-center md:text-left bg-gray-100 border-b border-gray-200 p-4`}><h2 className="text-lg">Header</h2></header>;
}

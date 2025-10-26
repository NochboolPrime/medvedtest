import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src="/images/design-mode/%D0%9D%D0%BE%D1%80%D0%BC%202.png"
        alt="Медведь Логотип"
        width={120}
        height={120}
        className="w-30 h-30 object-contain"
        priority
      />
    </div>
  )
}

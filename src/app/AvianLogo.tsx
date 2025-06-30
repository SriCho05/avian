import Image from 'next/image';

export default function AvianLogo({ className = '', ...props }) {
  return (
    <Image
      src="/avian-logo-white.png"
      alt="Avian Logo"
      width={40}
      height={40}
      className={className}
      style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(180deg)' }}
      {...props}
      priority
    />
  );
}

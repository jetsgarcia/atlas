import Image from "next/image";

interface BannerProps {
  wrapperClassName: string;
  headerClassName?: string;
  paragraphClassName: string;
  width: number;
  height: number;
}

export default function Banner({
  wrapperClassName,
  width,
  height,
  headerClassName,
  paragraphClassName,
}: BannerProps) {
  return (
    <div className={wrapperClassName}>
      <Image
        className="m-auto"
        src="/logo.png"
        alt="Philippine Army Logo"
        width={width}
        height={height}
      />
      <h1 className={headerClassName}>Philippine Army</h1>
      <p className={paragraphClassName}>Combined Arms Center</p>
    </div>
  );
}

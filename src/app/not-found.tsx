import Link from "next/link";
import { ArrowLeft } from "@/components/icons"
import { config } from "@/lib/config"

const nf = config.ui.notFound;

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 text-center">

      <div className="relative z-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
          {nf.code}
        </p>
        <h1 className="font-display mt-5 text-ink text-6xl font-semibold leading-[0.9] tracking-tighter sm:text-7xl">
          {nf.title}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-mute">
          {nf.description}
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-void transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
        >
          <ArrowLeft size={15} weight="bold" className="transition-transform duration-500 group-hover:-translate-x-1" />
          {config.ui.buttons.backHome}
        </Link>
      </div>
    </section>
  );
}

import Link from 'next/link'
import Image from 'next/image'

import Error404Image from '@/assets/error-404.png'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f7] px-6 text-center">
      <div className="relative mb-8 h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80">
  <Image
    src={Error404Image}
    alt="404 Illustration"
    fill
    priority
    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
    className="object-contain"
  />
</div>

      <h2 className="mb-2 text-3xl font-bold text-slate-900">
        Oops, page not found!
      </h2>

      <p className="mb-6 max-w-md text-sm text-slate-500">
        The page you are looking for is not available.
      </p>

      <Link
        href="/"
        className="rounded-md bg-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-600"
      >
        Go Back!
      </Link>
    </div>
  )
}
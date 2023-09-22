import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import logo from "@/public/logo-p-up.svg"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <div className="rounded-full overflow-hidden">
            <Image
              priority
              src={logo}
              alt="Proposal Up"
              height={8}
              width={8}
              className="h-8 w-8 fill-current"
              style={{ border: "none" }}
            />
        </div> */}
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.airi}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              airi labs
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
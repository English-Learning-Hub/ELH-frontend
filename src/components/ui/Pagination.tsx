import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface PaginationProps extends React.ComponentProps<"nav"> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props} />
))
Pagination.displayName = "Pagination"

interface PaginationContentProps extends React.ComponentProps<"ul"> {}

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-slot="pagination-content"
    className={cn("flex flex-row items-center gap-1", className)}
    {...props} />
))
PaginationContent.displayName = "PaginationContent"

interface PaginationItemProps extends React.ComponentProps<"li"> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(({ ...props }, ref) => (
  <li ref={ref} data-slot="pagination-item" {...props} />
))
PaginationItem.displayName = "PaginationItem"

interface PaginationLinkProps extends React.ComponentProps<"a"> {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
}

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(({ className, isActive, size = "icon", ...props }, ref) => (
  <a
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    data-slot="pagination-link"
    data-active={isActive}
    className={cn(buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }), className)}
    {...props} />
))
PaginationLink.displayName = "PaginationLink"

interface PaginationPreviousProps extends React.ComponentProps<typeof PaginationLink> {}

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, PaginationPreviousProps>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
    {...props}>
    <ChevronLeftIcon />
    <span className="hidden sm:block">Previous</span>
  </PaginationLink>
))
PaginationPrevious.displayName = "PaginationPrevious"

interface PaginationNextProps extends React.ComponentProps<typeof PaginationLink> {}

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
    {...props}>
    <span className="hidden sm:block">Next</span>
    <ChevronRightIcon />
  </PaginationLink>
))
PaginationNext.displayName = "PaginationNext"

interface PaginationEllipsisProps extends React.ComponentProps<"span"> {}

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
))
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}



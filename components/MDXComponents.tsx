import Link from "next/link";
import { AlertTriangle, Info, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "text-4xl font-cinzel font-bold text-gold mb-6 mt-8",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "text-3xl font-cinzel font-bold text-gold mb-4 mt-8",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "text-2xl font-cinzel font-semibold text-gold mb-3 mt-6",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("text-cream-white/80 mb-4 leading-relaxed", className)}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) return <a className={className} {...props} />;
    
    if (href.startsWith("http") || href.startsWith("//")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-gold hover:text-gold-light underline underline-offset-4 transition-colors",
            className
          )}
          {...props}
        />
      );
    }
    
    return (
      <Link
        href={href}
        className={cn(
          "text-gold hover:text-gold-light underline underline-offset-4 transition-colors",
          className
        )}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("list-disc list-inside mb-4 space-y-2 text-cream-white/80", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("list-decimal list-inside mb-4 space-y-2 text-cream-white/80", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("ml-4", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-l-4 border-gold pl-4 italic text-cream-white/70 my-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-anthracite/50 text-gold px-1.5 py-0.5 rounded text-sm font-mono",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "bg-anthracite/70 p-4 rounded-lg overflow-x-auto mb-4",
        className
      )}
      {...props}
    />
  ),
  Avertissement: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-6 flex gap-3"
      {...props}
    >
      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
      <div className="text-cream-white/80">{children}</div>
    </div>
  ),
  Note: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className="bg-gold/10 border border-gold/30 rounded-lg p-4 my-6 flex gap-3"
      {...props}
    >
      <Info className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
      <div className="text-cream-white/80">{children}</div>
    </div>
  ),
  Encadré: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className="bg-anthracite/50 border border-gold/20 rounded-lg p-4 my-6"
      {...props}
    >
      <FileText className="h-5 w-5 text-gold mb-2" />
      <div className="text-cream-white/80">{children}</div>
    </div>
  ),
};


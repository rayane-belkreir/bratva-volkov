import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { MDXComponents } from "@/components/MDXComponents";
import { generatePageMetadata } from "@/lib/seo";
import { readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import fs from "fs";

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      content,
    };
  } catch (error) {
    console.error("Error reading post:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const postsDirectory = path.join(process.cwd(), "content", "posts");
    const filenames = await readdir(postsDirectory);

    return filenames
      .filter((name) => name.endsWith(".mdx"))
      .map((filename) => ({
        slug: filename.replace(".mdx", ""),
      }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return generatePageMetadata("Dossier introuvable");
  }

  return generatePageMetadata(post.title, post.excerpt);
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown rendering
  const ReactMarkdown = (await import("react-markdown")).default;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <time className="text-sm text-cream-white/50 mb-4 block">
            {new Date(post.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-cream-white/70">{post.excerpt}</p>
          )}
        </header>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={MDXComponents as any}
            className="mdx-content"
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}


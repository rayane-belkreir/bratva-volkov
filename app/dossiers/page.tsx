import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { generatePageMetadata } from "@/lib/seo";

// Charger les composants dynamiquement (ssr: false retiré car c'est une Server Component)
const Timeline = dynamic(() => import("@/components/Timeline").then(mod => ({ default: mod.Timeline })), {
  loading: () => (
    <div className="text-center text-cream-white/50 py-8">
      <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-gold border-r-transparent"></div>
    </div>
  ),
});

const PostsGrid = dynamic(() => import("@/components/PostsGrid").then(mod => ({ default: mod.PostsGrid })), {
  loading: () => (
    <div className="text-center text-cream-white/50 py-12">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
      <p className="mt-4">Chargement des articles...</p>
    </div>
  ),
});

// Timeline events (could be extracted to a JSON file)
const timelineEvents = [
  {
    date: "Janvier 2024",
    title: "Opération Marseillaise",
    description:
      "Une opération stratégique qui a consolidé notre position dans le sud du territoire.",
  },
  {
    date: "Février 2024",
    title: "Accords de Palaiseau",
    description:
      "Un tournant diplomatique majeur qui a transformé le paysage territorial.",
  },
  {
    date: "Mars 2024",
    title: "Le Banquet du Silence",
    description:
      "Une cérémonie traditionnelle qui a renforcé les liens au sein de l'organisation.",
  },
];

function getPosts() {
  try {
    const postsDirectory = path.join(process.cwd(), "content", "posts");
    
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Posts directory not found:", postsDirectory);
      return [];
    }

    const filenames = fs.readdirSync(postsDirectory);

    if (filenames.length === 0) {
      return [];
    }

    const posts = filenames
      .filter((name) => name.endsWith(".mdx"))
      .map((filename) => {
        try {
          const filePath = path.join(postsDirectory, filename);
          
          if (!fs.existsSync(filePath)) {
            console.warn("Post file not found:", filePath);
            return null;
          }

          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContents);

          return {
            slug: filename.replace(".mdx", ""),
            title: data.title || filename,
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || "",
          };
        } catch (error) {
          console.error(`Error reading post ${filename}:`, error);
          return null;
        }
      })
      .filter((post): post is NonNullable<typeof post> => post !== null);

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

export const metadata = generatePageMetadata(
  "Dossiers",
  "Archives et chroniques de l'organisation. Les événements qui ont façonné notre histoire."
);

export default function DossiersPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="Dossiers"
        subtitle="Archives et chroniques. Les événements qui ont marqué notre organisation."
      />

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-2xl font-cinzel font-bold text-gold mb-8">
          Chronologie
        </h2>
        <Suspense
          fallback={
            <div className="text-center text-cream-white/50 py-8">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-gold border-r-transparent"></div>
            </div>
          }
        >
          <Timeline events={timelineEvents} />
        </Suspense>
      </section>

      {/* Posts */}
      <section>
        <h2 className="text-2xl font-cinzel font-bold text-gold mb-8">
          Archives
        </h2>
        <Suspense
          fallback={
            <div className="text-center text-cream-white/50 py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
              <p className="mt-4">Chargement des articles...</p>
            </div>
          }
        >
          <PostsGrid posts={posts} />
        </Suspense>
      </section>
    </div>
  );
}

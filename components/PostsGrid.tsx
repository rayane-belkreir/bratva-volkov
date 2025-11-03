"use client";

import Link from "next/link";
import { GlareCard } from "@/components/GlareCard";
import { motion } from "framer-motion";
import { FileText, Calendar } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface PostsGridProps {
  posts: Post[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="text-center text-cream-white/50 py-8">
        Aucun dossier disponible.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link href={`/dossiers/${post.slug}`}>
            <GlareCard>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-cream-white/50">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-gold">
                  {post.title}
                </h3>
                <p className="text-sm text-cream-white/70 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm text-gold pt-2">
                  <FileText className="h-4 w-4" />
                  <span>Lire la suite</span>
                </div>
              </div>
            </GlareCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}


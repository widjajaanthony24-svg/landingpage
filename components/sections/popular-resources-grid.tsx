"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

interface ResourceItem {
  slug: string;
  title: string;
  description: string;
  category: string | null;
  downloads: number;
}

export function PopularResourcesGrid({
  resources,
}: {
  resources: ResourceItem[];
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {resources.map((resource, i) => (
        <motion.div
          key={resource.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="border border-border rounded-lg p-5 hover:border-muted-foreground/30 transition-colors group"
        >
          {resource.category && (
            <p className="text-xs font-mono text-muted-foreground mb-3">
              {resource.category}
            </p>
          )}
          <h3 className="text-sm font-medium mb-2 group-hover:text-blue transition-colors">
            {resource.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {resource.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Download size={11} /> {resource.downloads}
            </span>
            <Link
              href={`/resources/${resource.slug}`}
              className="text-xs font-medium hover:text-blue transition-colors flex items-center gap-1"
            >
              Get it <ArrowRight size={11} />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

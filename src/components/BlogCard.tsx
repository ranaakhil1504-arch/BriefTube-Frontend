import { Link } from "react-router-dom";
import type { BlogPost } from "../data/blogPosts";
import { CalendarDays, Clock } from "lucide-react";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="mb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          {post.date}
        </span>

        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readTime}
        </span>
      </div>

      <h2 className="mb-3 text-2xl font-bold text-gray-900 transition group-hover:text-blue-600 dark:text-white">
        {post.title}
      </h2>

      <p className="leading-7 text-gray-600 dark:text-gray-300">
        {post.description}
      </p>

      <div className="mt-6 font-semibold text-blue-600">
        Read Article →
      </div>
    </Link>
  );
}
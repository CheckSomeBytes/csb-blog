import { useState } from "react";

interface Blog {
  title: string;
  date: string;
  url: string;
  tags: string[];
}

interface BlogFilterProps {
  blogs: Blog[];
  allTags: string[];
}

export default function BlogFilter({ blogs, allTags }: BlogFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setSelectedTags([]);

  const filteredBlogs =
    selectedTags.length === 0
      ? blogs
      : blogs.filter((blog) =>
          selectedTags.some((tag) => blog.tags.includes(tag))
        );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`animation rounded-lg px-3 py-1 text-sm ring-1 ring-gray-300 dark:ring-gray-600 ${
              selectedTags.includes(tag)
                ? "bg-accent text-background"
                : "hover:bg-accent hover:text-background"
            }`}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={clearFilters}
            className="animation rounded-lg px-3 py-1 text-sm text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>

      <p className="paragraph mb-4 text-sm opacity-70">
        Showing {filteredBlogs.length} of {blogs.length} posts
      </p>

      <ul className="space-y-3">
        {filteredBlogs.map((blog) => (
          <li key={blog.url}>
            <a
              href={blog.url}
              className="hover:bg-accent ring-background hover:ring-accent group animation flex h-full flex-col gap-2 rounded-lg shadow-lg ring-3 select-none hover:shadow-none hover:ring-3 active:ring-0 dark:shadow-2xl"
            >
              <div className="mx-4 mt-2 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-foreground group-hover:text-background animation self-start rounded-lg text-xl opacity-90 group-hover:font-semibold group-hover:tracking-wide">
                    {blog.title}
                  </h3>
                </div>
                <div className="flex">
                  <p className="animation mt-1 text-sm opacity-80 group-hover:text-[0rem] group-hover:opacity-0">
                    {blog.date}
                  </p>
                </div>
              </div>
              <div>
                <div className="mx-3 flex flex-wrap">
                  {blog.tags.map((tag: string) => (
                    <p
                      key={tag}
                      className="ring-foreground bg-background animation mx-1 flex items-center gap-1 rounded-lg px-3 pb-0.5 text-[0rem] opacity-90 group-hover:mb-3 group-hover:text-sm"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {filteredBlogs.length === 0 && (
        <p className="paragraph mt-8 text-center opacity-70">
          No posts match the selected tags.
        </p>
      )}
    </div>
  );
}

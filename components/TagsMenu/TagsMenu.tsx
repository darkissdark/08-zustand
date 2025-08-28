"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";
import type { FilterTag } from "@/types/note";
import { useState } from "react";

const tags: FilterTag[] = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={css.menuContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag === "All" ? "All notes" : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default TagsMenu;

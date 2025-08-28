import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { FilterTag } from "@/types/note";

const tags: FilterTag[] = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag === "All" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;

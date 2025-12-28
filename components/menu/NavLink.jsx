"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classess from "./NavLink.module.css";
import { IoMdCloudOutline } from "react-icons/io";
import { IoUmbrellaOutline } from "react-icons/io5";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classess.link} ${classess.active}`
          : classess.link
      }
    >
      {children === "Satz-Regeln" ? (
        <IoMdCloudOutline
          size={18}
          className={classess.Icon}
          style={{ color: path.startsWith(href) ? "black" : "#646464" }}
        />
      ) : (
        <IoUmbrellaOutline
          size={18}
          className={classess.Icon}
          style={{ color: path.startsWith(href) ? "black" : "#646464" }}
        />
      )}
      {children}
    </Link>
  );
}

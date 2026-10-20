export interface NavItemKey {
  key: "projects" | "about" | "contact";
  href: string;
}

export const navItemKeys: NavItemKey[] = [
  { key: "projects", href: "#projetos" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contato" },
];

export interface NavItem {
  label: string;
  href: string;
}

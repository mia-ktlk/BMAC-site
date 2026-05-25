const SCROLL_TO_KEY = "scrollTo";

/** Remember a home-page section to scroll to after navigating to `/`. */
export function setPendingSectionScroll(sectionId: string) {
  const id = sectionId.replace(/^#/, "");
  sessionStorage.setItem(SCROLL_TO_KEY, id);
}

export function peekPendingSectionScroll(): string | null {
  return sessionStorage.getItem(SCROLL_TO_KEY);
}

export function clearPendingSectionScroll() {
  sessionStorage.removeItem(SCROLL_TO_KEY);
}

export function consumePendingSectionScroll(): string | null {
  const id = sessionStorage.getItem(SCROLL_TO_KEY);
  if (id) sessionStorage.removeItem(SCROLL_TO_KEY);
  return id;
}

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(sectionId.replace(/^#/, ""));
  if (el) el.scrollIntoView({ behavior, block: "start" });
}

/** Retry until the section exists (e.g. after route mount). */
export function scrollToSectionWhenReady(
  sectionId: string,
  options?: { maxAttempts?: number; intervalMs?: number },
) {
  const id = sectionId.replace(/^#/, "");
  const maxAttempts = options?.maxAttempts ?? 12;
  const intervalMs = options?.intervalMs ?? 100;

  const tryScroll = (attempts = 0) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (attempts < maxAttempts) setTimeout(() => tryScroll(attempts + 1), intervalMs);
  };

  tryScroll();
}

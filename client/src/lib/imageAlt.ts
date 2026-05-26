/** Alt text when the logo sits beside visible “BMAC” text (avoids duplicate screen reader output). */
export const BMAC_LOGO_DECORATIVE_ALT = "";

/** Alt text when the logo is the primary label (no adjacent org name). */
export const BMAC_LOGO_ALT =
  "Boston Media Artists Collective logo";

export function teamMemberPhotoAlt(member: { name: string; role: string }) {
  return `Portrait of ${member.name}, ${member.role} at Boston Media Artists Collective`;
}

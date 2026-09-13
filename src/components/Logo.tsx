// Brand mark: a ring split into a teal half and a dark half. Vector version of
// the original logo.png so it stays crisp at any size and can take theme colours.

interface LogoProps {
  className?: string;
  /** Left half of the ring */
  primary?: string;
  /** Right half of the ring */
  secondary?: string;
}

export const Logo = ({
  className = "h-7 w-7",
  primary = "#095256",
  secondary = "currentColor",
}: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 3a9 9 0 0 0 0 18" fill="none" stroke={primary} strokeWidth="5" />
    <path d="M12 3a9 9 0 0 1 0 18" fill="none" stroke={secondary} strokeWidth="5" />
  </svg>
);

export default Logo;

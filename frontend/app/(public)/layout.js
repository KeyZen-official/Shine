import { PublicShell } from '../../components/layout/PublicShell';

/**
 * Wraps every public route. The admin panel sits outside this group with
 * its own layout, so no back-office code reaches a visitor's browser.
 */
export default function PublicLayout({ children }) {
  return <PublicShell>{children}</PublicShell>;
}

import { Inbox } from 'lucide-react';
import { Button } from './Button';

/**
 * `EmptyState` is all that remains of this file, and that is the point.
 *
 * It used to export five shape-matched loading skeletons, a polite
 * live-region wrapper, a no-results state and an error state. All of them
 * existed because pages fetched their content over HTTP: there was a moment
 * before the data arrived, and a way for it never to arrive.
 *
 * The content is now imported from files and inlined into static HTML at
 * build time. There is no pending state to mime and no request to fail, so
 * a loading skeleton would animate over data that is already there and an
 * error state could never render. Deleting them was the honest response to
 * that; keeping them would have left a reader thinking this site had
 * asynchronous states it does not have.
 *
 * What survives is the one state that is still reachable: a record, or a
 * filtered list, legitimately having nothing in it.
 */

/**
 * An empty state always carries the action that resolves it. "No results"
 * with no next step leaves the visitor stuck.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon: Icon = Inbox,
  className = '',
}) {
  return (
    <div
      className={`rounded-xl border border-dashed border-navy/20 bg-white px-6 py-16 text-center ${className}`}
    >
      <Icon className="mx-auto h-8 w-8 text-navy/30" aria-hidden="true" />
      <h3 className="mt-4 text-h3 font-semibold">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-measure text-body text-charcoal-70">{description}</p>
      ) : null}
      {actionLabel && (actionHref || onAction) ? (
        <div className="mt-6 flex justify-center">
          <Button href={actionHref} onClick={onAction} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

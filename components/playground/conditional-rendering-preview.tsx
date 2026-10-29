'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type UploadStatus = 'idle' | 'success' | 'error';

export function ConditionalRenderingPreview() {
  const [status, setStatus] = useState<UploadStatus>('idle');

  return (
    <section
      className="panel w-full p-5"
      aria-labelledby="conditional-rendering-heading"
    >
      <div className="panel-heading">
        <div>
          <p className="eyebrow">
            PHASE 2 · CONDITIONAL JSX
          </p>
          <h2 id="conditional-rendering-heading">
            Upload status
          </h2>
        </div>

        <span className="text-sm" role="status" aria-live="polite">
          Current status: <strong>{status}</strong>
        </span>
      </div>

      <p className="mt-4 text-sm">
        Change the status and observe when the message appears.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant={status === 'idle' ? 'ghost' : 'outline'}
          onClick={() => setStatus('idle')}
        >
          Idle
        </Button>

        <Button
          type="button"
          variant={status === 'success' ? 'default' : 'outline'}
          onClick={() => setStatus('success')}
        >
          Success
        </Button>

        <Button
          type="button"
          variant={status === 'error' ? 'destructive' : 'outline'}
          onClick={() => setStatus('error')}
        >
          Error
        </Button>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <p className="text-sm font-semibold">
          Preview output
        </p>

        <div className="mt-3 min-h-10 text-[var(--green)]" aria-live="polite">
          {
            status === 'success' && (
              <p>Upload completed successfully.</p>
            )
          }
        </div>
      </div>

      <p className="mt-4 text-sm">
        Exercise: Replace the placeholder with your
        conditional JSX expression.
      </p>
    </section>
  );
}

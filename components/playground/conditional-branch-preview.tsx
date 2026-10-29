'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export function ConditionalBranchPreview() {
  const [status, setStatus] =
    useState<ConnectionStatus>('disconnected');

  return (
    <section
      className="panel w-full p-5"
      aria-labelledby="connection-preview-heading"
    >
      <p className="eyebrow">
        PHASE 2 · CONDITIONAL BRANCHES
      </p>

      <h2 id="connection-preview-heading">
        Connection status
      </h2>

      <p className="mt-3 text-sm" role="status" aria-live="polite">
        Current status: <strong>{status}</strong>
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant={status === 'connected' ? 'default' : 'outline'}
          onClick={() => setStatus('connected')}
        >
          Connect
        </Button>

        <Button
          type='button'
          variant={'ghost'}
          onClick={() => setStatus('connecting')}
          aria-label="Set status to connecting"
        >
          Connecting
        </Button>

        <Button
          type="button"
          variant={status === 'disconnected' ? 'default' : 'outline'}
          onClick={() => setStatus('disconnected')}
        >
          Disconnect
        </Button>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <p className="text-sm font-semibold">
          Preview output
        </p>

        <div className="mt-3 min-h-10" aria-live="polite">
          {
            status === 'connected' ? (
              <p>Connected Successfully.</p>
            ): status === 'connecting' ? (
              <p>Connecting...</p>
            ): (
              <p>You are offline.</p>
            )
          }
        </div>
      </div>
    </section>
  );
}

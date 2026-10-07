We are retiring the old batch-report worker today. I approve disabling its schedule and stopping that worker. Historical reports and the delivery audit trail must remain intact. Please review the engineer's shutdown plan and give a usable sequence. Do not change files or execute application workflows; reading available instruction documents is allowed. No application checkout is available.

Supplied operational evidence:
- The supervisor's stop action sends SIGKILL immediately. It has no graceful-stop hook and disables restart only after the stop action.
- For each report job, this worker acknowledges the queue message, then renders the report, writes its object, and commits a delivery_audit row. Its current in-memory inFlight count is 3. The queue depth is 0 because those messages have already been acknowledged.
- A health endpoint exposes inFlight and the worker logs audit_committed for each completed job. Completed rows are durable; unfinished jobs have no durable checkpoint and cannot be replayed from the acknowledged queue messages.
- A nightly schedule and an external partner publish jobs. The partner is still active. Pausing this worker's queue intake prevents new claims without terminating its current jobs; the queue persists messages while intake is paused.
- The history viewer reads the report bucket and delivery_audit. The deployed worker selector is confirmed to be legacy; the current worker is a separate process.
- The proposed plan is: disable the nightly schedule, stop the worker, then pause queue intake and inspect remaining work. Keep the bucket, table, and queue, and remove legacy source later after external references are checked.

Is the proposed order compatible with my approval and retention requirements? Explain any necessary change and what must be verified before stopping the worker.

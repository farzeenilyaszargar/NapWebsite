# X conversion tracking

The shared root layout loads pixel `rhsuk` once with `next/script` using
`afterInteractive`. The base snippet is unchanged. Client-side navigation does
not install a second copy. No browser conversion event is fired currently.

## Configure server conversions

1. Confirm which events should be sent and copy each `tw-rhsuk-xxxxx` event ID
   from X Events Manager. The existing integration supports confirmed waitlist
   signups; other events need a corresponding server confirmation point.
2. In the Manual setup window in X Ads Manager, click **Next**, then
   **Generate access token**. Set `X_PIXEL_TOKEN` in the hosting environment
   (and `.env.local` for local testing). Never use a `NEXT_PUBLIC_` prefix.
3. Once the waitlist event is confirmed, set `X_WAITLIST_EVENT_ID` to that ID.
   Redeploy after configuring the environment. Without both values, no server
   conversion is sent.

After Supabase confirms a new signup, the API schedules conversion delivery with
Next.js `after`, so X latency/failure cannot block the signup response. Duplicate
emails do not create another conversion. The payload uses the normalized email's
SHA-256 hex hash and `waitlist-<saved-row-id>` as its conversion ID. No raw email,
phone, IP, or token is logged or sent in the conversion body. Hashed email supplies
the required matching identifier; capturing `twclid` is not necessary for this
integration.

If a browser event is added later, it must use the same event ID and
`conversion_id` returned/derived from the persisted signup, rather than generating
an independent ID. The current base pixel only runs `config`.

## Verify

- Open the deployed site with the X Pixel Helper Chrome extension and confirm
  pixel `rhsuk` fires on the homepage and other routes.
- Once the token and real event ID are set, send an explicitly identified test
  conversion and check that X returns HTTP 200. The automated tests mock X; they
  do not prove live credentials or X Ads attribution.
- Check hosting logs for `X conversion request failed` or
  `X conversion request could not be completed`. Logs contain no identifiers or
  response bodies. Delivery is best effort; there is no durable retry queue.

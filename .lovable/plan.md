# Editable Locations List

## Changes
- Start the Locations section with exactly five countries.
- Add compact add and delete controls inside the Locations section.
- Allow adding a country name and percentage, while keeping the list capped at five.
- Keep existing inline editing and progress-bar updates working.
- Remove the visible white strip on the right by making the page and mobile frame fully dark and correctly clipped.

## Technical details
- Keep the country list in screen state and pass it to a focused editable list control.
- Reuse the existing dashboard styling and add only the controls and states needed for this request.
- Verify the Locations tab at desktop and mobile widths.

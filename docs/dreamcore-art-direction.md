# Dreamcore refinement

## Requirements

- Preserve the dark palette, Fustat body type, Instrument Serif accent, and approved page title.
- Use the supplied Group 595 ghost mark for the header and footer home links, rendered solid white without changing its silhouette.
- Replace reference-poster imagery with an original, consistent halftone image. Keep the real product screenshot and existing agent logos.
- Do not blur, dim, stretch, or heavily crop the new artwork. Its empty upper area keeps text and buttons readable.
- Remove decorative eyebrow labels, slogans, generic feature icons, and nonessential separator lines.
- Use concrete product copy and make waitlist actions the primary visible controls.
- Keep the waitlist API, validation, error, retry, and success behaviour working.

## Artwork

Asset: `public/nap-halftone-coast-a9782154.webp`, 2172 x 724 pixels, approximately 301 KB. Encoded from the original generated PNG at WebP quality 95 without resizing or cropping. Source PNG remains in the Codex generated-images directory. The first sculpture and flower assets are removed; user references are aesthetic references only.

Method: built-in image generation, new original image, no reference-image compositing.

Final prompt:

> Use case: stylized-concept. Create one ORIGINAL production-ready bitmap artwork for a premium dark website for Nap, a native coding-agent app. The user's inspiration is monochrome dreamcore, clean 1-bit dithering and vintage halftone print, NOT a request to reproduce any poster, statue, flower or existing design. Subject: a slender suspension footbridge joining two rugged rocky sea cliffs, seen in a very wide, restrained nighttime landscape. Visually convincing architectural proportions, beautifully drawn rocky details, subtle ocean horizon. Medium: exceptionally crisp black-and-white ordered-dither/stipple engraving; clearly resolved tiny square pixels and small printed dots, not blurry photographic grain. Composition: panoramic 3:1 horizontal banner, generous pure solid BLACK negative space across the upper 60% for webpage typography; all landscape and bridge detail confined to the bottom 40%, reaching across the width with the brightest detail low on the left and low on the right. Leave the central upper area completely empty black. Highest-quality deliberate art direction, sharp contours, restrained density of white pixels, natural tonal detail constructed only from dot spacing. Palette exclusively black and white, no colors, no warm tint. No words, labels, lettering, logos, numbers, screenshots, UI, borders, frames, paper margin, stars, moons, glowing orbs, beams, lens flare, gradients or blur. The art should feel calm, surreal and intentional, not a busy fantasy illustration. Wide panoramic high-resolution output.

## Layout

The hero uses the complete panorama at its original aspect ratio with no cropping. Screen blending makes the black image background merge with the page without reducing the white detail. The headline, explanation, and waitlist button occupy the empty sky; the landscape sits below the controls. The actual app screenshot follows immediately. Agent logos retain their original colors. A cropped close-up of the same screenshot provides the future demo-video area; it does not pretend to be playable. The closing waitlist section sits above a second full-width landscape. The footer contains only the ghost, copyright, and a back-to-top link; navigation is limited to the header. Waitlist arrows are Lucide icons, not text glyphs.

## Footer artwork

Asset: `public/nap-halftone-arch.webp`, 2172 x 724 pixels, approximately 436 KB, encoded at WebP quality 95 without resizing. Generated with the built-in image tool, with no reference inputs.

Prompt: Original panoramic monochrome halftone engraving of a dramatic coastal rock arch over a still ocean, with a tiny distant suspension bridge. Crisp printmaking details, solid black sky for compositing, no text, frame, UI, gradients, or blur.

Logo: `public/nap-ghost-source.png` is an unmodified copy of the supplied artwork. CSS brightness and screen compositing turn its grey interior solid white while preserving the exact source silhouette and blending its black background into the page.

# Fonts

Self-hosted variable fonts, loaded through `next/font/local` in `src/lib/fonts.ts`. All three are
licensed under the SIL Open Font License 1.1; each upstream licence text, with its copyright line
and reserved font names, is in `licenses/`.

| File                              | Family         | Source                                      | Licence                           |
| --------------------------------- | -------------- | ------------------------------------------- | --------------------------------- |
| `inter-var.woff2`                 | Inter          | https://github.com/rsms/inter               | `licenses/inter-OFL.txt`          |
| `inter-var-italic.woff2`          | Inter          | https://github.com/rsms/inter               | `licenses/inter-OFL.txt`          |
| `source-serif-4-var.woff2`        | Source Serif 4 | https://github.com/adobe-fonts/source-serif | `licenses/source-serif-4-OFL.txt` |
| `source-serif-4-var-italic.woff2` | Source Serif 4 | https://github.com/adobe-fonts/source-serif | `licenses/source-serif-4-OFL.txt` |
| `jetbrains-mono-var.woff2`        | JetBrains Mono | https://github.com/JetBrains/JetBrainsMono  | `licenses/jetbrains-mono-OFL.txt` |

## Integrity

SHA-256 of the files as committed. Recompute with `sha256sum public/fonts/*.woff2` after any
replacement and update this table in the same commit.

| File                              | Bytes  | SHA-256                                                            |
| --------------------------------- | ------ | ------------------------------------------------------------------ |
| `inter-var.woff2`                 | 352240 | `693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3` |
| `inter-var-italic.woff2`          | 387976 | `e564f652916db6c139570fefb9524a77c4d48f30c92928de9db19b6b5c7a262a` |
| `source-serif-4-var.woff2`        | 426716 | `f146ee102dddcc5bc7a2cf4af5bcf129832195941b92bd0a512626f390688c1e` |
| `source-serif-4-var-italic.woff2` | 328372 | `da0aa4649d3a48d10809ee4c55099abe797653abfceda94abd31b2f42a3e0f0f` |
| `jetbrains-mono-var.woff2`        | 92164  | `a9cb1cd82332b23a47e3a1239d25d13c86d16c4220695e34b243effa999f45f2` |

The upstream release versions and any subsetting applied were not recorded when the files were
imported (April 2026). When a font is next updated, record the release tag and the subsetting
command here.

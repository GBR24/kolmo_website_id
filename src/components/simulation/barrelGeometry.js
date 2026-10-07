// Simple oil barrel geometry kept separate from the renderer so the visual can
// be restyled or replaced without touching the homepage layout.
export const barrelShell = [
  "M 230 110 C 170 160 170 460 230 510",
  "M 770 110 C 830 160 830 460 770 510",
  "M 230 110 C 330 50 670 50 770 110 C 670 170 330 170 230 110",
  "M 230 510 C 330 570 670 570 770 510 C 670 450 330 450 230 510",
];

export const barrelRibs = [
  "M 198 205 C 315 150 685 150 802 205",
  "M 185 310 C 310 250 690 250 815 310",
  "M 198 415 C 315 360 685 360 802 415",
];

export const barrelSeams = [
  "M 230 110 C 285 160 285 460 230 510",
  "M 770 110 C 715 160 715 460 770 510",
];

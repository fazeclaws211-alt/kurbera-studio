import cotton from "@/assets/fabric-cotton.jpg";
import linen from "@/assets/fabric-linen.jpg";
import prints from "@/assets/fabric-prints.jpg";
import embroidery from "@/assets/fabric-embroidery.jpg";
import blends from "@/assets/fabric-blends.jpg";
import custom from "@/assets/fabric-custom.jpg";
import f1 from "@/assets/look-festive-1.jpg";
import f2 from "@/assets/look-festive-2.jpg";
import d1 from "@/assets/look-daily-1.jpg";
import d2 from "@/assets/look-daily-2.jpg";
import b1 from "@/assets/look-boutique-1.jpg";
import b2 from "@/assets/look-boutique-2.jpg";
import c1 from "@/assets/look-custom-1.jpg";

export type FabricKey =
  | "Dailywear"
  | "Festive"
  | "Resort"
  | "Bridal"
  | "Occasion"
  | "Signature";

export const fabricDetails: Record<
  FabricKey,
  { code: string; season: string; descriptor: string; swatches: string[]; cover: string }
> = {
  Dailywear: {
    code: "KB-DW",
    season: "All-season",
    descriptor: "Easy silhouettes for the everyday — soft tailoring, light layers.",
    swatches: ["var(--cream-warm)", "var(--paper-deep)", "var(--blush)"],
    cover: cotton,
  },
  Festive: {
    code: "KB-FS",
    season: "Festive '26",
    descriptor: "Rich tones and considered detail for festival evenings.",
    swatches: ["var(--kubera-red)", "var(--gold)", "var(--blush)"],
    cover: prints,
  },
  Resort: {
    code: "KB-RS",
    season: "Resort '26",
    descriptor: "Breezy cuts and prints made for warm, slow afternoons.",
    swatches: ["var(--paper-deep)", "var(--olive)", "var(--cream-warm)"],
    cover: linen,
  },
  Bridal: {
    code: "KB-BR",
    season: "Bridal Atelier",
    descriptor: "Heirloom-leaning silhouettes — quiet, hand-finished, personal.",
    swatches: ["var(--moss)", "var(--gold)", "var(--blush)"],
    cover: embroidery,
  },
  Occasion: {
    code: "KB-OC",
    season: "Year-round",
    descriptor: "Sharply cut pieces for dinners, debuts, and small gatherings.",
    swatches: ["var(--blush)", "var(--olive)", "var(--paper-deep)"],
    cover: blends,
  },
  Signature: {
    code: "KB-SG",
    season: "House line",
    descriptor: "The house silhouettes we return to — refined, unmistakable.",
    swatches: ["var(--kubera-red)", "var(--moss)", "var(--blush)"],
    cover: custom,
  },
};

export type Piece = {
  id: string;
  line: FabricKey;
  name: string;
  silhouette: string;
  notes: string;
  tags: string[];
  image: string;
};

export const pieces: Piece[] = [
  // Dailywear
  { id: "DW-01", line: "Dailywear", name: "Cream Field Kurta", silhouette: "Straight kurta", notes: "Soft cotton, mother-of-pearl buttons.", tags: ["Cotton", "Easy"], image: d1 },
  { id: "DW-02", line: "Dailywear", name: "Moss Glow Set", silhouette: "Kurta + pant set", notes: "Olive twill, narrow piping at the placket.", tags: ["Set", "Workday"], image: d2 },
  { id: "DW-03", line: "Dailywear", name: "Paper Shirt Dress", silhouette: "Belted shirt dress", notes: "Lightweight cotton, hidden pockets.", tags: ["Dress", "Travel"], image: cotton },
  { id: "DW-04", line: "Dailywear", name: "Linen Wrap Top", silhouette: "Wrap top", notes: "Sand linen, self-tie at the waist.", tags: ["Top", "Linen"], image: linen },

  // Festive
  { id: "FS-01", line: "Festive", name: "Vermilion Gold Anarkali", silhouette: "Floor-grazing anarkali", notes: "Hand-block print, fine gota at the hem.", tags: ["Anarkali", "Diwali"], image: f1 },
  { id: "FS-02", line: "Festive", name: "Rose Field Lehenga", silhouette: "A-line lehenga", notes: "Blush with rose vine embroidery.", tags: ["Lehenga", "Sangeet"], image: f2 },
  { id: "FS-03", line: "Festive", name: "Rosewater Kurta Set", silhouette: "Kurta + sharara", notes: "Printed silk-blend, scalloped dupatta.", tags: ["Set", "Evening"], image: prints },
  { id: "FS-04", line: "Festive", name: "Sindoor Cape Set", silhouette: "Cape over palazzo", notes: "Kubera red, hand-finished beading.", tags: ["Cape", "Festive"], image: blends },

  // Resort
  { id: "RS-01", line: "Resort", name: "Stack Six Co-ord", silhouette: "Cropped jacket + pant", notes: "Striped linen, raw-edge trims.", tags: ["Co-ord", "Resort"], image: b1 },
  { id: "RS-02", line: "Resort", name: "Paper & Petal Dress", silhouette: "Tiered midi", notes: "Botanical print on cotton voile.", tags: ["Dress", "Sun"], image: b2 },
  { id: "RS-03", line: "Resort", name: "Sand Linen Shirt", silhouette: "Oversized shirt", notes: "Lightweight linen, wood buttons.", tags: ["Shirt", "Linen"], image: linen },
  { id: "RS-04", line: "Resort", name: "Olive Beach Kaftan", silhouette: "Kaftan", notes: "Soft cotton, deep side slits.", tags: ["Kaftan", "Resort"], image: cotton },

  // Bridal
  { id: "BR-01", line: "Bridal", name: "Atelier 12 Lehenga", silhouette: "Heirloom lehenga", notes: "Moss zardozi on dupion, hand-finished.", tags: ["Bridal", "Lehenga"], image: c1 },
  { id: "BR-02", line: "Bridal", name: "Mehndi Mirror Set", silhouette: "Kurta + dhoti", notes: "Mirror-work on raw silk.", tags: ["Mehndi", "Set"], image: embroidery },
  { id: "BR-03", line: "Bridal", name: "Reception Cape Gown", silhouette: "Cape gown", notes: "Blush silk with gold thread.", tags: ["Reception", "Gown"], image: blends },
  { id: "BR-04", line: "Bridal", name: "Trousseau Sharara", silhouette: "Sharara set", notes: "Brocade dupatta, custom palette.", tags: ["Trousseau", "Sharara"], image: f1 },

  // Occasion
  { id: "OC-01", line: "Occasion", name: "Blush Slip Gown", silhouette: "Bias-cut slip", notes: "Crepe silk, cowl back.", tags: ["Gown", "Dinner"], image: f2 },
  { id: "OC-02", line: "Occasion", name: "Olive Tux Set", silhouette: "Tuxedo + trouser", notes: "Tailored wool-blend, satin lapel.", tags: ["Tux", "Debut"], image: d2 },
  { id: "OC-03", line: "Occasion", name: "Garnet Saree Drape", silhouette: "Pre-pleated saree", notes: "Deep red with thread border.", tags: ["Saree", "Evening"], image: prints },
  { id: "OC-04", line: "Occasion", name: "Ivory Column Dress", silhouette: "Column dress", notes: "Structured crepe, sculpted neckline.", tags: ["Dress", "Cocktail"], image: b2 },

  // Signature
  { id: "SG-01", line: "Signature", name: "Kubera Red Kurta", silhouette: "Signature kurta", notes: "House red, side-seam embroidery.", tags: ["Kurta", "Signature"], image: custom },
  { id: "SG-02", line: "Signature", name: "Moss Bandhgala", silhouette: "Bandhgala jacket", notes: "Olive wool-blend, horn buttons.", tags: ["Jacket", "Signature"], image: c1 },
  { id: "SG-03", line: "Signature", name: "Blush Statement Saree", silhouette: "Drape saree", notes: "House motif border in gold.", tags: ["Saree", "House"], image: f2 },
  { id: "SG-04", line: "Signature", name: "Ivory House Suit", silhouette: "Three-piece suit", notes: "Hand-finished, monogram lining.", tags: ["Suit", "House"], image: b1 },
];

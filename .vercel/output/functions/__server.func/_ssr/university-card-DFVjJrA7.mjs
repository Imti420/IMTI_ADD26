import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay, n as cn, r as daysUntil } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as SYSTEM_LABEL, y as TRACK_LABEL } from "./router-BSu7Hrrm.mjs";
import { c as StatusPill, r as ExternalLink } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/university-card-DFVjJrA7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function earliestExam(circular) {
	if (!circular) return null;
	const days = [...circular.units.map((unit) => unit.examDate), circular.examDate].filter((day) => Boolean(day));
	if (!days.length) return null;
	return [...days].sort()[0] ?? null;
}
function shortDay(iso) {
	if (!iso) return "—";
	return formatDay(iso).replace(/ \d{4}$/, "");
}
function Mark({ label, value, missing }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 border-t border-ink pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-widest text-mute",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-1 truncate font-display text-2xl font-bold uppercase leading-none", missing && "text-mute"),
			children: value
		})]
	});
}
function UniversityCard({ uni, related, status, index }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const primary = related[0] ?? null;
	const seats = primary?.seats ?? null;
	const exam = earliestExam(primary);
	const closes = primary?.applicationCloses ?? null;
	const units = primary?.units ?? [];
	const closeDays = closes ? daysUntil(closes) : null;
	const hot = status === "open" || closeDays != null && closeDays >= 0 && closeDays <= 14;
	const nameSize = uni.shortName.length > 6 ? "text-3xl" : "text-5xl";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("card-doc flex flex-col border border-ink bg-paper p-4", hot && "border-l-4 border-l-accent", index < 9 && "rise"),
		style: index < 9 ? { animationDelay: `${index * 45}ms` } : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-mute",
					children: String(index + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/universities/$id",
				params: { id: uni.id },
				className: "mt-3 block hover:text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: cn("font-display font-bold uppercase leading-none", nameSize),
					children: uni.shortName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: uni.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs tracking-widest text-mute",
				children: [
					TRACK_LABEL[uni.track].toUpperCase(),
					uni.city ? ` · ${uni.city.toUpperCase()}` : "",
					uni.kind === "system" ? " · SYSTEM" : ""
				]
			}),
			primary && primary.system !== "own" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-mono text-xs tracking-widest",
				children: ["CLUSTER · ", SYSTEM_LABEL[primary.system].toUpperCase()]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-xs tracking-widest text-mute",
				children: primary ? `CLUSTER · ${SYSTEM_LABEL[primary.system].toUpperCase()}` : "CLUSTER · NOT ON FILE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						label: "Seats",
						value: seats == null ? "—" : seats.toLocaleString("en-BD"),
						missing: seats == null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						label: "Closes",
						value: shortDay(closes),
						missing: !closes
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						label: "Exam",
						value: shortDay(exam),
						missing: !exam
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs leading-tight text-mute",
						children: seats == null ? "NOT ON FILE" : "ON CIRCULAR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs leading-tight text-mute",
						children: closes ? formatDay(closes) : "NOT ON FILE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs leading-tight text-mute",
						children: exam ? formatDay(exam) : "NOT ON FILE"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "UNITS / SUBJECTS"
				}), units.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs text-mute",
					children: "SUBJECT LIST NOT ON FILE"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 flex flex-wrap gap-1",
					children: [units.slice(0, open ? units.length : 4).map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border border-ink px-1.5 py-1 font-mono text-xs uppercase",
						children: unit.code
					}, unit.code)), !open && units.length > 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "self-center font-mono text-xs text-mute",
						children: ["+", units.length - 4]
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-ink pt-3",
				children: [primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/circulars/$id",
					params: { id: primary.id },
					className: "text-sm leading-snug hover:text-accent",
					children: primary.title
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-mute",
					children: "NO CIRCULAR ON FILE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-xs text-mute",
					children: [related.length === 0 ? "00 CIRCULARS" : `${String(related.length).padStart(2, "0")} CIRCULAR${related.length === 1 ? "" : "S"}`, uni.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						href: uni.website,
						children: uni.website.replace(/^https?:\/\//, "")
					})] }) : " · SITE NOT LISTED"]
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3 border-t border-ink pt-3 text-sm",
				children: [
					units.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: units.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-bold uppercase leading-none",
							children: unit.code
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block",
							children: unit.detail || "Detail not on file."
						})] }, `${unit.code}-detail`))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "ELIGIBILITY · "
					}), primary && primary.eligibility.length ? primary.eligibility[0] : "NOT ON FILE"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "FEE · "
					}), primary?.feeBdt == null ? "NOT ANNOUNCED" : `BDT ${primary.feeBdt.toLocaleString("en-BD")}`] }),
					primary?.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						href: primary.pdfUrl,
						children: "Official PDF"
					}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-mute",
						children: "PDF NOT ON FILE"
					}),
					uni.admissionUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						href: uni.admissionUrl,
						children: "Application portal"
					}) }) : null,
					uni.directoryNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-pretty",
						children: uni.directoryNote
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 h-11 border border-ink px-3 text-left font-mono text-xs tracking-widest hover:bg-ink hover:text-paper",
				"aria-expanded": open,
				onClick: () => setOpen((value) => !value),
				children: open ? "CLOSE DETAIL" : "OPEN DETAIL"
			})
		]
	});
}
//#endregion
export { earliestExam as n, UniversityCard as t };

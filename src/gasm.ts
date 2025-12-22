import type { LanguageRegistration } from "@shikijs/core";

export const gasm: LanguageRegistration = {
	name: "gasm",
	displayName: "GRAB Assembly",
	scopeName: "source.gasm",
	fileTypes: ["gasm"],
	injectTo: ["source.markdown"],

	patterns: [
		{ include: "#comments" },
		{ include: "#macros" },
		{ include: "#variables" },
		{ include: "#instructions" },
		{ include: "#special-registers" },
		{ include: "#registers" },
		{ include: "#numbers" },
		{ include: "#labels" },
	],

	repository: {
		comments: {
			patterns: [
				{
					name: "comment.line.semicolon.gasm",
					match: ";.*$",
				},
			],
		},

		macros: {
			patterns: [
				{
					name: "function.other.macro.gasm",
					match: "#(FOR|IF|END)\\b",
				},
			],
		},

		variables: {
			patterns: [
				{
					name: "function.other.macro.gasm",
					match: "#[A-Za-z_][A-Za-z0-9_]*\\b",
				},
			],
		},

		instructions: {
			patterns: [
				{
					name: "keyword.control.instruction.gasm",
					match: "\\b(NOOP|SET|SWAP|ADD|SUB|MUL|DIV|EQUAL|LESS|GREATER|AND|OR|NOT|LABEL|GOTO|IF|SLEEP|END|RAND|FLOOR|MOD|SIN|COS|SQRT|ATAN2)\\b",
				},
			],
		},

		"special-registers": {
			patterns: [
				{
					name: "variable.other.property.special.gasm",
					match: "\\b(ProgramCounter|Halt|HaltFrame|SleepTimer|DeltaTime)\\b",
				},
			],
		},

		registers: {
			patterns: [
				{
					name: "variable.other.register.gasm",
					match: "\\bR\\d+\\b",
				},
				{
					name: "variable.other.connection.gasm",
					match: "\\b[A-Za-z_][A-Za-z0-9_]*\\.[A-Za-z0-9_.]+\\b",
				},
				{
					name: "variable.other.connection.gasm",
					match: "\\b[A-Za-z_][A-Za-z0-9_]*(?=#)\\b",
				},
			],
		},

		numbers: {
			patterns: [
				{
					name: "constant.numeric.gasm",
					match: "\\b\\d+(?:\\.\\d+)?\\b",
				},
			],
		},

		labels: {
			patterns: [
				{
					name: "entity.name.label.gasm",
					match: "\\b[A-Za-z_][A-Za-z0-9_]*\\b",
				},
			],
		},
	},
};

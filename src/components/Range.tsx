import react from "react";

export default function Range({ value, onChange }: { value: number; onChange: (value: number) => void }) {
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(parseInt(e.target.value));
	};

	return (
		<div>
			<input type="range" min="0" max="359" value={value} onChange={change} />
			<p>{value}</p>
		</div>
	);
}

export default function Copy(value: any) {
	if (value == undefined) return undefined;
	if (value == null) return null;
	return JSON.parse(JSON.stringify(value));
}

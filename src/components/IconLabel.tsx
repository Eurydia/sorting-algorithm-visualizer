import { FC, ReactNode } from "react";
import { Typography } from "@mui/material";

type ColorLabelProps = {
	icon: ReactNode;
	label: string;
};
export const IconLabel: FC<ColorLabelProps> = (
	props,
) => {
	const { icon, label } = props;

	return (
		<Typography
			width="100%"
			display="flex"
			alignItems="center"
			justifyContent="flex-start"
		>
			{icon} : {label}
		</Typography>
	);
};

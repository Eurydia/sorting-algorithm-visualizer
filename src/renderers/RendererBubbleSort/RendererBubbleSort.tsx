import { FC, useEffect, useState } from "react";
import {
	Button,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";

import { bubbleSort, FrameState } from "./helper";

type RendererBubbleSortProps = {
	dataset: number[];
	size: number;
	maxValue: number;
};

export const RendererBubbleSort: FC<
	RendererBubbleSortProps
> = (props) => {
	const { dataset, size, maxValue } = props;

	const [frame, setFrame] = useState<number>(0);

	const [frameStates, _] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];

			bubbleSort([...dataset], size, frameStates);

			return frameStates;
		},
	);

	const getNextFrame = () => {
		if (frame >= frameStates.length - 1) {
			return;
		}

		const element: HTMLElement | null =
			document.getElementById("bubble-sort");
		if (element === null) {
			return;
		}
		element.scrollIntoView(false);

		setFrame((prevFrame) => {
			return prevFrame + 1;
		});
	};

	const getPrevFrame = () => {
		if (frame < 1) {
			return;
		}

		setFrame((prevFrame) => {
			return prevFrame - 1;
		});
	};

	const currFrame: FrameState =
		frameStates[frame];

	return (
		<Grid
			width="100%"
			container
			columns={12}
			spacing={1}
		>
			<Grid
				item
				xs={12}
			>
				<Stack>
					<Typography variant="body1">
						{`Frame ${frame + 1}/${
							frameStates.length
						}`}
					</Typography>
					<Typography variant="body1">
						{`Comparison: ${currFrame.comparisonCount}`}
					</Typography>
					<Typography variant="body1">
						{`Swap: ${currFrame.swapCount}`}
					</Typography>
					<Typography
						variant="body1"
						minHeight="3rem"
					>
						{`Status: ${currFrame.frameDescription}`}
					</Typography>
				</Stack>
			</Grid>
			<Grid
				container
				item
				columns={size}
				width="100%"
				height="500px"
			>
				{currFrame.elementStates.map(
					(
						{
							value,
							isBeingCompared,
							isBeingSwapped,
							isSwapped,
						},
						index,
					) => {
						const height: string = `${
							(value / maxValue) * 500
						}px`;

						let bgColor: string = `hsl(0, 0%, ${
							(value / maxValue) * 80
						}%)`;
						if (isBeingCompared) {
							bgColor = blue.A100;
						} else if (isBeingSwapped) {
							bgColor = blue.A200;
						} else if (isSwapped) {
							bgColor = blue.A700;
						} else if (
							(index === 0 &&
								frame > 0 &&
								frame < frameStates.length - 1) ||
							index ===
								currFrame.workingRegionLastIndex
						) {
							bgColor = red.A100;
						}
						return (
							<Grid
								key={`k-${value}`}
								item
								xs={1}
								height={height}
								sx={{
									backgroundColor: bgColor,
								}}
							/>
						);
					},
				)}
			</Grid>
			<Grid
				item
				xs={6}
			>
				<Button
					fullWidth
					variant="contained"
					onClick={getPrevFrame}
					disabled={frame === 0}
				>
					Previous Frame
				</Button>
			</Grid>
			<Grid
				item
				xs={6}
			>
				<Button
					fullWidth
					variant="contained"
					onClick={getNextFrame}
					disabled={
						frame >= frameStates.length - 1
					}
				>
					Next Frame
				</Button>
			</Grid>
		</Grid>
	);
};

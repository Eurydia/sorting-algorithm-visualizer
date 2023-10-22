import { FC, useState } from "react";
import {
	Button,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import {
	blue,
	green,
	red,
} from "@mui/material/colors";

import {
	selectionSort,
	FrameState,
} from "./helper";

type RendererSelectionSortProps = {
	dataset: number[];
	size: number;
	maxValue: number;
};

export const RendererSelectionSort: FC<
	RendererSelectionSortProps
> = (props) => {
	const { dataset, size, maxValue } = props;

	const [frame, setFrame] = useState<number>(0);

	const [frameStates, _] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];

			selectionSort(
				[...dataset],
				size,
				frameStates,
			);
			return frameStates;
		},
	);

	const getNextFrame = () => {
		if (frame >= frameStates.length - 1) {
			return;
		}

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

	const currFrameState: FrameState =
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
						{`Comparison: ${currFrameState.comparisonCount}`}
					</Typography>
					<Typography variant="body1">
						{`Swap: ${currFrameState.swapCount}`}
					</Typography>
					<Typography
						variant="body1"
						minHeight="3rem"
					>
						{`Status: ${currFrameState.frameDescription}`}
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
				{currFrameState.elementStates.map(
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

						if (
							index ===
							currFrameState.workingRegionFirstIndex
						) {
							bgColor = red.A100;
						}
						if (
							index === currFrameState.pivotIndex
						) {
							bgColor = green[400];
						}
						if (isBeingCompared) {
							bgColor = blue.A100;
						}
						if (isBeingSwapped) {
							bgColor = blue.A200;
						}
						if (isSwapped) {
							bgColor = blue.A700;
						}

						return (
							<Grid
								key={`k-${index}`}
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

import { FC, useState } from "react";
import {
	Button,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";

import {
	insertionSort,
	FrameState,
} from "./helper";

type RendererInsertionSortProps = {
	dataset: number[];
	size: number;
	maxValue: number;
};

export const RendererInsertionSort: FC<
	RendererInsertionSortProps
> = (props) => {
	const { dataset, size, maxValue } = props;

	const [frame, setFrame] = useState<number>(0);

	const [
		{
			frameStates,
			frameDescs,
			swapCounter,
			comparisonCounter,
		},
		_,
	] = useState<{
		frameStates: FrameState[][];
		frameDescs: string[];
		swapCounter: number[];
		comparisonCounter: number[];
	}>(() => {
		const newFrameStates: FrameState[][] = [];
		const newFrameDescs: string[] = [];
		const newSwapCounter: number[] = [];
		const newComparisonCounter: number[] = [];

		insertionSort(
			[...dataset],
			size,
			newFrameStates,
			newFrameDescs,
			newSwapCounter,
			newComparisonCounter,
		);

		return {
			swapCounter: newSwapCounter,
			comparisonCounter: newComparisonCounter,
			frameStates: newFrameStates,
			frameDescs: newFrameDescs,
		};
	});

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
						{`Comparison: ${comparisonCounter[frame]}`}
					</Typography>
					<Typography variant="body1">
						{`Swap: ${swapCounter[frame]}`}
					</Typography>
					<Typography variant="body1">
						Status: {`${frameDescs[frame]}`}
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
				{frameStates[frame].map(
					({
						value,
						isBeingCompared,
						isBeingSwapped,
						isSwapped,
					}) => {
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

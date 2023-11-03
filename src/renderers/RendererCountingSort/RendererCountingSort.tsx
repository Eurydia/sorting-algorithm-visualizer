import { FC, useState } from "react";
import {
	Button,
	Grid,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";

import {
	countingSort,
	FrameState,
} from "./helper";

type RendererCountingSortProps = {
	dataset: number[];
	size: number;
};

export const RendererCountingSort: FC<
	RendererCountingSortProps
> = (props) => {
	const { dataset, size } = props;

	const [tabIndex, setTabIndex] =
		useState<number>(0);
	const [frame, setFrame] = useState<number>(0);

	const [frameStates] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];

			countingSort(
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

	const maxValue: number = Math.max(...dataset);

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
					{/* <Typography variant="body1">
						{`Comparison: ${currFrameState.comparisonCount}`}
					</Typography>
					<Typography variant="body1">
						{`Swap: ${currFrameState.swapCount}`}
					</Typography> */}
					<Typography
						variant="body1"
						minHeight="3rem"
					>
						{`Status: ${currFrameState.frameDescription}`}
					</Typography>
				</Stack>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<Tabs
					value={tabIndex}
					onChange={(_, nextIndex) =>
						setTabIndex(nextIndex)
					}
				>
					<Tab label="Input" />
					<Tab label="Auxiliary" />
				</Tabs>
			</Grid>
			<Grid
				container
				item
				columns={size}
				width="100%"
				minHeight={`${maxValue}px`}
			>
				{currFrameState.elementStates.map(
					({ value }, index) => {
						const height: string = `${
							(value / maxValue) * 500
						}px`;

						let bgColor: string = `hsl(0, 0%, ${
							(value / maxValue) * 80
						}%)`;

						// if (
						// 	index ===
						// 	currFrameState.workingRegionFirstIndex
						// ) {
						// 	bgColor = red.A100;
						// }
						// if (
						// 	index === currFrameState.pivotIndex
						// ) {
						// 	bgColor = green[400];
						// }
						// if (isBeingCompared) {
						// 	bgColor = blue.A100;
						// }
						// if (isBeingSwapped) {
						// 	bgColor = blue.A200;
						// }
						// if (isSwapped) {
						// 	bgColor = blue.A700;
						// }

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

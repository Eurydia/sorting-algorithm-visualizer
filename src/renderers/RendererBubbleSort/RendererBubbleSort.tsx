import { FC, useState } from "react";
import {
	Box,
	Button,
	Stack,
	Typography,
} from "@mui/material";
import {
	blue,
	deepOrange,
	orange,
	pink,
} from "@mui/material/colors";

import { IconLabel } from "components/IconLabel";

import {
	bubbleSort,
	ElementState,
	FrameState,
} from "./helper";
import {
	SquareRounded,
	RocketLaunchRounded,
} from "@mui/icons-material";

type ElementBubbleSortProps = {
	value: number;
	maxValue: number;
	size: number;
	states: ElementState;
};
const ElementBubbleSort: FC<
	ElementBubbleSortProps
> = (props) => {
	const { value, maxValue, size, states } = props;

	const {
		compared,
		beingSwapped,
		swapped,
		lastElementOfUnsortedRegion,
		bubbling,
	} = states;

	const height: number = (value / maxValue) * 100;

	const width: number = (1 / size) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 80
	}%)`;

	if (lastElementOfUnsortedRegion) {
		bgColor = pink.A100;
	}

	if (compared) {
		bgColor = blue.A100;
	}

	if (beingSwapped) {
		bgColor = orange["A100"];
	}

	if (swapped) {
		bgColor = deepOrange["A100"];
	}

	return (
		<Box
			sx={{
				width: `${width}%`,
				height: `${height}%`,
				backgroundColor: bgColor,
			}}
		>
			{bubbling ? "🚀" : ""}
		</Box>
	);
};

type RendererBubbleSortProps = {
	dataset: number[];
};
export const RendererBubbleSort: FC<
	RendererBubbleSortProps
> = (props) => {
	const { dataset } = props;

	const size: number = dataset.length;
	const maxValue: number = Math.max(...dataset);

	const [frame, setFrame] = useState<number>(0);

	const [frameStates] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];

			bubbleSort([...dataset], size, frameStates);

			return frameStates;
		},
	);

	const onFrameAdvance = () => {
		if (frame === frameStates.length - 1) {
			return;
		}

		setFrame((prevFrame) => {
			return prevFrame + 1;
		});
	};

	const onFrameRewind = () => {
		if (frame === 0) {
			return;
		}

		setFrame((prevFrame) => {
			return prevFrame - 1;
		});
	};

	const heightPx: number = 600;

	const currFrame: FrameState =
		frameStates[frame];

	return (
		<Box>
			<Stack spacing={2}>
				<Box>
					<IconLabel
						icon={
							<SquareRounded
								htmlColor={pink.A100}
							/>
						}
						label="Last element of unsorted region"
					/>
					<IconLabel
						icon={
							<SquareRounded
								htmlColor={blue.A100}
							/>
						}
						label="Elements are being compared"
					/>
					<IconLabel
						icon={
							<SquareRounded
								htmlColor={orange.A100}
							/>
						}
						label="Elements are being swapped"
					/>
					<IconLabel
						icon={
							<SquareRounded
								htmlColor={deepOrange.A100}
							/>
						}
						label="Elements are swapped"
					/>
					<IconLabel
						icon={<RocketLaunchRounded />}
						label="Element is being bubbled up"
					/>
				</Box>
				<Box>
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
					<Typography variant="body1">
						{currFrame.frameDescription}
					</Typography>
				</Box>

				<Box
					display="flex"
					flexDirection="row"
					alignItems="flex-end"
					sx={{
						width: "100%",
						height: `${heightPx}px`,
					}}
				>
					{currFrame.elementStates.map(
						({ value, states }, index) => {
							return (
								<ElementBubbleSort
									key={`key-${index}`}
									value={value}
									maxValue={maxValue}
									size={size}
									states={states}
								/>
							);
						},
					)}
				</Box>
				<Stack
					direction="row"
					spacing={2}
				>
					<Button
						fullWidth
						variant="contained"
						onClick={onFrameRewind}
						disabled={frame === 0}
					>
						Previous Frame
					</Button>
					<Button
						fullWidth
						variant="contained"
						onClick={onFrameAdvance}
						disabled={
							frame === frameStates.length - 1
						}
					>
						Next Frame
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

import { FC, useState, useEffect } from "react";
import {
	Box,
	Button,
	Grid,
	Typography,
} from "@mui/material";
import {
	blue,
	deepOrange,
	pink,
} from "@mui/material/colors";
import { SquareRounded } from "@mui/icons-material";

import { IconLabel } from "components/IconLabel";
import { bubbleSort, FrameState } from "./helper";

type RendererElemenetProps = {
	value: number;
	maxValue: number;

	compared: boolean;
	swapped: boolean;
	rightMostUnsortedElement: boolean;
	bubbling: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		maxValue,
		value,
		compared,
		swapped,
		rightMostUnsortedElement,
		bubbling,
	} = props;

	const height: number = (value / maxValue) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 90
	}%)`;

	if (rightMostUnsortedElement) {
		bgColor = pink["A100"];
	}

	if (compared) {
		bgColor = blue["A100"];
	}

	if (swapped) {
		bgColor = deepOrange["A100"];
	}

	return (
		<Grid
			item
			xs={1}
			height={`${height}%`}
			alignItems="flex-start"
			display="flex"
			justifyContent="center"
			bgcolor={bgColor}
		>
			{bubbling ? "🚀" : ""}
		</Grid>
	);
};

const prepareFrameStates = (
	dataset: number[],
): FrameState[] => {
	const size: number = dataset.length;
	const frameStates: FrameState[] = [];
	bubbleSort([...dataset], size, frameStates);
	return frameStates;
};

type RendererBubbleSortProps = {
	dataset: number[];
	heightPx: number;
};
export const RendererBubbleSort: FC<
	RendererBubbleSortProps
> = (props) => {
	const { dataset, heightPx } = props;

	const size: number = dataset.length;
	const maxValue: number = Math.max(...dataset);

	const [frame, setFrame] = useState<number>(0);
	const [frameStates, setFrameStates] = useState<
		FrameState[]
	>(prepareFrameStates(dataset));

	useEffect(() => {
		setFrame(0);
		setFrameStates(prepareFrameStates(dataset));
	}, [dataset]);

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

	const currFrame: FrameState =
		frameStates[frame];

	return (
		<Box>
			<Typography variant="h3">
				Bubble sort
			</Typography>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
					sm={6}
				>
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
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
				>
					<IconLabel
						label="Right-most unsorted element"
						icon={
							<SquareRounded
								htmlColor={pink.A100}
							/>
						}
					/>
					<IconLabel
						label="Being compared"
						icon={
							<SquareRounded
								htmlColor={blue.A100}
							/>
						}
					/>
					<IconLabel
						label="Swapped places"
						icon={
							<SquareRounded
								htmlColor={deepOrange.A100}
							/>
						}
					/>
					<IconLabel
						icon="🚀"
						label="Element is bubbling up"
					/>
				</Grid>
			</Grid>
			<Grid
				container
				columns={size}
				display="flex"
				flexDirection="row"
				alignItems="flex-end"
				height={`${heightPx}px`}
				paddingY={2}
			>
				{currFrame.elementStates.map(
					(value, index) => {
						return (
							<RendererElement
								key={`key-${index}`}
								maxValue={maxValue}
								value={value}
								compared={currFrame.compared.includes(
									index,
								)}
								swapped={currFrame.swapped.includes(
									index,
								)}
								rightMostUnsortedElement={
									index ===
									currFrame.rightMostUnsortedElement
								}
								bubbling={
									index === currFrame.pivot
								}
							/>
						);
					},
				)}
			</Grid>
			<Grid
				container
				spacing={2}
				paddingY={2}
			>
				<Grid
					item
					xs={6}
				>
					<Button
						fullWidth
						variant="contained"
						onClick={onFrameRewind}
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
						onClick={onFrameAdvance}
						disabled={
							frame === frameStates.length - 1
						}
					>
						Next Frame
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

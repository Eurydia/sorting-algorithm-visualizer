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
import {
	bubbleSort,
	FrameState,
} from "./bubbleSort";

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
		(value / maxValue) * 70 + 15
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
			className="renderer-element"
			height={`${height}%`}
			bgcolor={bgColor}
		>
			{bubbling ? "🧼" : ""}
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
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
					id="bubble-sort"
				>
					<Typography variant="h3">
						Bubble sort
					</Typography>
				</Grid>
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
					<Typography
						variant="body1"
						height="3rem"
					>
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
						icon="🧼"
						label="Bubble"
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<Grid
						container
						columns={size}
						height={`${heightPx}px`}
						className="renderer-container"
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
											index === currFrame.bubble
										}
									/>
								);
							},
						)}
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
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
					xs={12}
					sm={6}
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
				<Grid
					item
					xs={12}
				>
					<Typography variant="h3">
						Explanations
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					id="bubble-sort-additional-explanation-one"
				>
					<Typography fontWeight="bold">
						Moving pivot to{" "}
						<code>input[i + 1]</code>
					</Typography>
					<Typography>
						From the previous comparison, bubble
						sort knows that{" "}
						<code>
							input[i] &le; input[i + 1]
						</code>
						, which is a correct order, so it
						moves the bubble to{" "}
						<code>input[i + 1]</code> without
						swapping.
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					id="bubble-sort-additional-explanation-two"
				>
					<Typography fontWeight="bold">
						Swapping <code>input[i]</code> and{" "}
						<code>input[i + 1]</code>
					</Typography>
					<Typography>
						From the previous comparison, bubble
						sort knows that{" "}
						<code>
							input[i] &gt; input[i + 1]
						</code>
						, which is an incorrect order, so it
						swaps positions of{" "}
						<code>input[i]</code> and{" "}
						<code>input[i + 1]</code>.
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					id="bubble-sort-additional-explanation-three"
				>
					<Typography fontWeight="bold">
						Moving pivot to <code>input[0]</code>
					</Typography>
					<Typography>
						The bubble has reached the right-most
						unsorted element so the current pass
						is complete. The bubble resets to{" "}
						<code>input[0]</code> and prepare for
						a new pass.
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

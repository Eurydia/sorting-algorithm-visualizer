import { FC, useState } from "react";
import {
	Button,
	Box,
	Typography,
	Grid,
} from "@mui/material";
import {
	blue,
	deepOrange,
	pink,
} from "@mui/material/colors";
import { SquareRounded } from "@mui/icons-material";

import { IconLabel } from "components/IconLabel";

import {
	insertionSort,
	FrameState,
} from "./helper";

type RendererElemenetProps = {
	maxValue: number;
	value: number;

	compared: boolean;
	swapped: boolean;
	leftMostUnsortedElement: boolean;
	smallestElement: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		value,
		maxValue,

		compared,
		swapped,
		leftMostUnsortedElement,
		smallestElement,
	} = props;

	const height: number = (value / maxValue) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 70 + 15
	}%)`;

	if (leftMostUnsortedElement) {
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
			bgcolor={bgColor}
			height={`${height}%`}
		>
			{smallestElement ? "🦐" : ""}
		</Grid>
	);
};

type RendererInsertionSortProps = {
	dataset: number[];
	heightPx: number;
};
export const RendererInsertionSort: FC<
	RendererInsertionSortProps
> = (props) => {
	const { dataset, heightPx } = props;

	const size: number = dataset.length;
	const maxValue: number = Math.max(...dataset);

	const [frame, setFrame] = useState<number>(0);
	const [frameStates] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];
			insertionSort(
				[...dataset],
				size,
				frameStates,
			);
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
		<Box>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
					id="insertion-sort"
				>
					<Typography variant="h3">
						Insertion Sort
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
						label="Left-most unsorted element"
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
						icon="🦐"
						label="Key"
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<Grid
						container
						columns={size}
						className="renderer-container"
						height={`${heightPx}px`}
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
										leftMostUnsortedElement={
											index ===
											currFrame.leftMostUnsortedElement
										}
										smallestElement={
											index ===
											currFrame.smallestElement
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
					<Typography variant="h4">
						Explanations
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					id="insertion-sort-additional-explanation-one"
				>
					<Typography fontWeight="bold">
						Moving pivot to left-most unsorted
						element
					</Typography>
					<Typography>
						From the previous comparison, the
						algorithm knows that{" "}
						<code>
							input[i] &ge; input[i - 1]
						</code>
						, which only happens when the key has
						been inserted into the correct
						position. The key moves to the
						left-most unsorted element to prepare
						for a new pass.
					</Typography>
					<Typography>
						Alternatively, the same happens if the
						key is <code>input[0]</code>.
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					id="insertion-sort-additional-explanation-two"
				>
					<Typography fontWeight="bold">
						Swapping <code>input[i]</code> and{" "}
						<code>input[i - 1]</code>
					</Typography>
					<Typography>
						From the previous comparison, the
						algorithm knows that{" "}
						<code>
							input[i] &lt; input[i - 1]
						</code>
						. The key is not in the correct place,
						so it swaps the positions of{" "}
						<code>input[i]</code> and{" "}
						<code>input[i - 1]</code> to ensure
						that the key is on the left.
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

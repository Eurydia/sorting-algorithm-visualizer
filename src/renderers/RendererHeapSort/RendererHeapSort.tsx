import { FC, useState } from "react";
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
import { heapSort, FrameState } from "./helper";

type RendererElemenetProps = {
	value: number;
	maxValue: number;
	size: number;

	compared: boolean;
	swapped: boolean;
	rightMostUnsortedElement: boolean;
	childElement: boolean;
	parentElement: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		value,
		maxValue,

		compared,
		swapped,
		rightMostUnsortedElement,
		childElement,
		parentElement,
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

	let label: string = "";
	if (parentElement) {
		label = "🐔";
	}
	if (childElement) {
		label = "🐤";
	}

	return (
		<Grid
			item
			xs={1}
			className="renderer-element"
			height={`${height}%`}
			bgcolor={bgColor}
		>
			{label}
		</Grid>
	);
};

type RendererHeapSortProps = {
	dataset: number[];
	heightPx: number;
};
export const RendererHeapSort: FC<
	RendererHeapSortProps
> = (props) => {
	const { dataset, heightPx } = props;

	const size: number = dataset.length;
	const maxValue: number = Math.max(...dataset);

	const [frame, setFrame] = useState<number>(0);
	const [frameStates] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];
			heapSort([...dataset], size, frameStates);
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
						Heapsort
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
						icon={
							<SquareRounded
								htmlColor={pink.A100}
							/>
						}
						label="Right-most unsorted element"
					/>
					<IconLabel
						icon={
							<SquareRounded
								htmlColor={blue.A100}
							/>
						}
						label="Compared"
					/>

					<IconLabel
						icon={
							<SquareRounded
								htmlColor={deepOrange.A100}
							/>
						}
						label="Swapped places"
					/>
					<IconLabel
						icon="🐔"
						label="Parent"
					/>
					<IconLabel
						icon="🐤"
						label="Child"
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
										size={size}
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
										parentElement={
											index ===
											currFrame.parentElement
										}
										childElement={currFrame.childrenElements.includes(
											index,
										)}
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
			</Grid>
		</Box>
	);
};

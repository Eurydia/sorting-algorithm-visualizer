import { FC, useState } from "react";
import {
	Button,
	Box,
	Stack,
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
	insertionSort,
	FrameState,
} from "./helper";

type RendererElemenetProps = {
	size: number;
	maxValue: number;
	value: number;

	compared: boolean;
	swapped: boolean;
	leftMostUnsortedElement: boolean;
	pivot: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		value,
		maxValue,
		size,

		compared,
		swapped,
		leftMostUnsortedElement,
		pivot,
	} = props;

	const height: number = (value / maxValue) * 100;

	const width: number = (1 / size) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 90
	}%)`;

	if (leftMostUnsortedElement) {
		bgColor = pink.A100;
	}

	if (compared) {
		bgColor = blue.A100;
	}

	if (swapped) {
		bgColor = deepOrange["A100"];
	}

	return (
		<Box
			display="flex"
			alignItems="baseline"
			justifyContent="center"
			sx={{
				width: `${width}%`,
				height: `${height}%`,
				backgroundColor: bgColor,
			}}
		>
			{pivot ? "🗿" : ""}
		</Box>
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
			<Stack spacing={2}>
				<Box>
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
						icon="🗿"
						label="Pivot"
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
									leftMostUnsortedElement={
										index ===
										currFrame.leftMostUnsortedElement
									}
									pivot={
										index === currFrame.pivot
									}
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

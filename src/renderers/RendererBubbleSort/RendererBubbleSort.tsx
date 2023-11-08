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
	pink,
} from "@mui/material/colors";
import { SquareRounded } from "@mui/icons-material";

import { IconLabel } from "components/IconLabel";
import { bubbleSort, FrameState } from "./helper";

type RendererElemenetProps = {
	value: number;
	maxValue: number;
	size: number;

	compared: boolean;
	swapped: boolean;
	lastElementOfUnsortedRegion: boolean;
	bubbling: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		maxValue,
		size,
		value,
		compared,
		swapped,
		lastElementOfUnsortedRegion,
		bubbling,
	} = props;

	const height: number = (value / maxValue) * 100;

	const width: number = (1 / size) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 90
	}%)`;

	if (lastElementOfUnsortedRegion) {
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
			{bubbling ? "🚀" : ""}
		</Box>
	);
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
						label="Right-most unsorted element"
					/>
					<IconLabel
						icon={
							<SquareRounded
								htmlColor={blue.A100}
							/>
						}
						label="Being compared"
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
						icon="🚀"
						label="Bubbling up"
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
									lastElementOfUnsortedRegion={currFrame.lastElementOfUnsortedRegion.includes(
										index,
									)}
									bubbling={currFrame.bubbling.includes(
										index,
									)}
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

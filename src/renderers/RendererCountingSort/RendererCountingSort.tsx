import { FC, useState } from "react";
import {
	Button,
	Box,
	Stack,
	Typography,
} from "@mui/material";
import {
	teal,
	orange,
} from "@mui/material/colors";
import { SquareRounded } from "@mui/icons-material";

import { IconLabel } from "components/IconLabel";

import {
	countingSort,
	FrameState,
} from "./helper";

type RendererElemenetProps = {
	size: number;
	maxValue: number;
	value: number;
	stateRead: boolean;
	stateWrite: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		size,
		value,
		maxValue,
		stateRead,
		stateWrite,
	} = props;

	const height: number = (value / maxValue) * 100;

	const width: number = (1 / size) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 90
	}%)`;

	if (stateRead) {
		bgColor = teal.A100;
	}

	if (stateWrite) {
		bgColor = orange.A100;
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
		></Box>
	);
};

type RendererCountingSortProps = {
	dataset: number[];
	heightPx: number;
};
export const RendererCountingSort: FC<
	RendererCountingSortProps
> = (props) => {
	const { dataset, heightPx } = props;

	const size: number = dataset.length;
	const maxValue: number = Math.max(...dataset);

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
						label="Being read from"
						icon={
							<SquareRounded
								htmlColor={teal.A100}
							/>
						}
					/>
					<IconLabel
						label="Being written to"
						icon={
							<SquareRounded
								htmlColor={orange.A100}
							/>
						}
					/>
				</Box>
				<Box>
					<Typography variant="body1">
						{`Frame ${frame + 1}/${
							frameStates.length
						}`}
					</Typography>
					<Typography variant="body1">
						{`Read: ${currFrame.memReadCount}`}
					</Typography>
					<Typography variant="body1">
						{`Write: ${currFrame.memWriteCount}`}
					</Typography>
					<Typography variant="body1">
						{currFrame.frameDescription}
					</Typography>
				</Box>
				<Typography variant="h3">
					<code>input</code> memory
				</Typography>
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
									stateRead={
										index === currFrame.memRead
									}
									stateWrite={
										index === currFrame.memWrite
									}
								/>
							);
						},
					)}
				</Box>
				<Typography variant="h3">
					<code>aux</code> memory
				</Typography>
				<Box
					display="flex"
					flexDirection="row"
					alignItems="flex-end"
					sx={{
						width: "100%",
						height: `${heightPx}px`,
					}}
				>
					{currFrame.auxStates.length === 0 &&
						"The auxiliary memory is not used in at this time."}
					{currFrame.auxStates.map(
						(value, index) => {
							return (
								<RendererElement
									key={`key-aux-${index}`}
									maxValue={maxValue}
									size={size}
									value={value}
									stateRead={
										index === currFrame.memAuxRead
									}
									stateWrite={
										index ===
										currFrame.memAuxWrite
									}
								/>
							);
						},
					)}
				</Box>
				<Typography variant="h3">
					<code>sortedAux</code> memory
				</Typography>
				<Box
					display="flex"
					flexDirection="row"
					alignItems="flex-end"
					sx={{
						width: "100%",
						height: `${heightPx}px`,
					}}
				>
					{currFrame.sortedAuxStates.length ===
						0 &&
						"The sorted auxiliary memory is not used in at this time."}
					{currFrame.sortedAuxStates.map(
						(value, index) => {
							return (
								<RendererElement
									key={`key-sorted-aux-${index}`}
									maxValue={maxValue}
									size={size}
									value={value}
									stateRead={
										index ===
										currFrame.memSortedAuxRead
									}
									stateWrite={
										index ===
										currFrame.memSortedAuxWrite
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

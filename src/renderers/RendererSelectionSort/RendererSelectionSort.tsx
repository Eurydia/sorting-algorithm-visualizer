import { FC, useState } from "react";
import {
	Button,
	Box,
	Typography,
	Grid,
} from "@mui/material";
import { SquareRounded } from "@mui/icons-material";
import {
	blue,
	pink,
	deepOrange,
} from "@mui/material/colors";

import { IconLabel } from "components/IconLabel";

import {
	selectionSort,
	FrameState,
} from "./helper";

type RendererElemenetProps = {
	value: number;
	maxValue: number;

	compared: boolean;
	swapped: boolean;
	firstOfUnsortedRegion: boolean;
	keyElement: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		maxValue,
		value,
		compared,
		swapped,
		firstOfUnsortedRegion,
		keyElement,
	} = props;

	const height: number = (value / maxValue) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 90
	}%)`;

	if (firstOfUnsortedRegion) {
		bgColor = pink.A100;
	}

	if (compared) {
		bgColor = blue.A100;
	}

	if (swapped) {
		bgColor = deepOrange["A100"];
	}

	return (
		<Grid
			item
			xs={1}
			bgcolor={bgColor}
			height={`${height}%`}
			className="renderer-element"
		>
			{keyElement ? "👻" : ""}
		</Grid>
	);
};

type RendererSelectionSortProps = {
	dataset: number[];
	heightPx: number;
};
export const RendererSelectionSort: FC<
	RendererSelectionSortProps
> = (props) => {
	const { dataset, heightPx } = props;

	const size: number = dataset.length;
	const maxValue: number = Math.max(...dataset);

	const [frame, setFrame] = useState<number>(0);
	const [frameStates] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];

			selectionSort(
				[...dataset],
				size,
				frameStates,
			);
			return frameStates;
		},
	);

	const onFrameAdvance = () => {
		if (frame >= frameStates.length - 1) {
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
					id="selection-sort"
				>
					<Typography variant="h3">
						Selection sort
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
						icon={
							<SquareRounded
								htmlColor={pink.A100}
							/>
						}
						label="Left-most unsorted element"
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
						icon="👻"
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
										firstOfUnsortedRegion={
											index ===
											currFrame.leftMostUnsortedElement
										}
										keyElement={
											index ===
											currFrame.keyElement
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
			</Grid>
		</Box>
	);
};

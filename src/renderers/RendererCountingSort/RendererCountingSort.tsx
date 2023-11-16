import {
	FC,
	SyntheticEvent,
	useState,
} from "react";
import {
	Button,
	Box,
	Typography,
	Grid,
	Tabs,
	Tab,
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
		value,
		maxValue,
		stateRead,
		stateWrite,
	} = props;

	const clampedValue: number = Math.max(value, 0);

	const height: number =
		(clampedValue / maxValue) * 100;

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
		<Grid
			item
			xs={1}
			className="renderer-element"
			height={`${height}%`}
			bgcolor={bgColor}
		/>
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
	const [tabPanelIndex, setTabPabelIndex] =
		useState<number>(0);
	const [frameStates] = useState<FrameState[]>(
		() => {
			const frameStates: FrameState[] = [];
			const dd = [...dataset];
			console.table(dd);
			countingSort(dd, size, frameStates);

			console.table(dd);
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
	const onTabPanelIndexChange = (
		_: SyntheticEvent,
		nextIndex: string,
	) => {
		setTabPabelIndex(Number.parseInt(nextIndex));
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
				>
					<Typography variant="h3">
						Counting sort
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
						{`Read: ${currFrame.memReadCount}`}
					</Typography>
					<Typography variant="body1">
						{`Write: ${currFrame.memWriteCount}`}
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
						label="Element was read from"
						icon={
							<SquareRounded
								htmlColor={teal.A100}
							/>
						}
					/>
					<IconLabel
						label="Element was written to"
						icon={
							<SquareRounded
								htmlColor={orange.A100}
							/>
						}
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<Tabs
						value={tabPanelIndex}
						onChange={onTabPanelIndexChange}
					>
						<Tab
							label="Primary memory"
							value={0}
						/>
						<Tab
							label="Auxiliary memory"
							value={1}
						/>
						<Tab
							label="Sorted memory"
							value={2}
						/>
					</Tabs>
				</Grid>
				<Grid
					item
					xs={12}
					display={
						tabPanelIndex === 0
							? undefined
							: "none"
					}
				>
					<Grid
						container
						columns={size}
						className="renderer-container"
						height={`${heightPx}px`}
					>
						{currFrame.mainElementStates.map(
							(value, index) => {
								return (
									<RendererElement
										key={`key-${index}`}
										maxValue={maxValue}
										size={size}
										value={value}
										stateRead={
											index ===
											currFrame.mainMemRead
										}
										stateWrite={
											index ===
											currFrame.mainMemWritten
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
					display={
						tabPanelIndex === 1
							? undefined
							: "none"
					}
				>
					<Grid
						container
						columns={maxValue + 1}
						className="renderer-container"
						height={`${heightPx}px`}
					>
						{currFrame.auxiElementStates
							.length === 0 &&
							"The auxiliary memory is not used in at this time."}
						{currFrame.auxiElementStates.map(
							(value, index) => {
								return (
									<RendererElement
										key={`key-aux-${index}`}
										maxValue={maxValue}
										size={size}
										value={value}
										stateRead={
											index ===
											currFrame.auxiMemRead
										}
										stateWrite={
											index ===
											currFrame.auxiMemWritten
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
					display={
						tabPanelIndex === 2
							? undefined
							: "none"
					}
				>
					<Grid
						container
						columns={size}
						className="renderer-container"
						height={`${heightPx}px`}
					>
						{currFrame.auxiElementStates
							.length === 0 &&
							"The sorted memory is not used in at this time."}
						{currFrame.sortElementStates.map(
							(value, index) => {
								return (
									<RendererElement
										key={`key-sorted-aux-${index}`}
										maxValue={maxValue}
										size={size}
										value={value}
										stateRead={
											index ===
											currFrame.sortMemRead
										}
										stateWrite={
											index ===
											currFrame.sortMemWritten
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

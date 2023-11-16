import {
	FC,
	useState,
	SyntheticEvent,
} from "react";
import {
	Button,
	Box,
	Typography,
	Tab,
	Tabs,
	Grid,
} from "@mui/material";
import {
	blue,
	pink,
	teal,
	orange,
} from "@mui/material/colors";
import { SquareRounded } from "@mui/icons-material";

import { IconLabel } from "components/IconLabel";

import { mergeSort, FrameState } from "./helper";

type RendererElemenetProps = {
	maxValue: number;
	value: number;
	compared: boolean;
	readElement: boolean;
	wroteElement: boolean;
	terminalElement: boolean;
};
const RendererElement: FC<
	RendererElemenetProps
> = (props) => {
	const {
		value,
		maxValue,
		compared,
		readElement,
		wroteElement,
		terminalElement: leftMostOrRightMostElement,
	} = props;

	const height: number = (value / maxValue) * 100;

	let bgColor: string = `hsl(0, 0%, ${
		(value / maxValue) * 90
	}%)`;

	if (leftMostOrRightMostElement) {
		bgColor = pink.A100;
	}

	if (compared) {
		bgColor = blue.A100;
	}

	if (readElement) {
		bgColor = teal.A100;
	}

	if (wroteElement) {
		bgColor = orange.A100;
	}

	return (
		<Grid
			item
			xs={1}
			bgcolor={bgColor}
			height={`${height}%`}
			className="renderer-element"
		/>
	);
};

type RendererMergeSortProps = {
	dataset: number[];
	heightPx: number;
};
export const RendererMergeSort: FC<
	RendererMergeSortProps
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
			mergeSort([...dataset], size, frameStates);
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
					id="insertion-sort"
				>
					<Typography variant="h3">
						Merge sort
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
						{`Read: ${currFrame.memReadCount}`}
					</Typography>
					<Typography variant="body1">
						{`Write: ${currFrame.memWriteCount}`}
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
						label="Terminal element of working region"
						icon={
							<SquareRounded
								htmlColor={pink.A100}
							/>
						}
					/>
					<IconLabel
						label="Compared"
						icon={
							<SquareRounded
								htmlColor={blue.A100}
							/>
						}
					/>
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
						{tabPanelIndex === 0 &&
							currFrame.mainElementStates.map(
								(value, index) => {
									return (
										<RendererElement
											key={`key-${index}`}
											maxValue={maxValue}
											value={value}
											terminalElement={currFrame.terminalElements.includes(
												index,
											)}
											compared={currFrame.compared.includes(
												index,
											)}
											readElement={
												index ===
												currFrame.mainMemRead
											}
											wroteElement={
												index ===
												currFrame.mainMemWrote
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
						columns={size}
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
										value={value}
										compared={false}
										terminalElement={false}
										readElement={
											index ===
											currFrame.auxiMemRead
										}
										wroteElement={
											index ===
											currFrame.auxiMemWrote
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

import { FC, Fragment, useState } from "react";

import "./styles/App.css";
import "./styles/renderer.css";

import {
	Container,
	Stack,
	CssBaseline,
	Box,
	Tabs,
	Tab,
	Typography,
} from "@mui/material";

import { RendererBubbleSort } from "./renderers/RendererBubbleSort";
import { RendererInsertionSort } from "./renderers/RendererInsertionSort";
import { RendererSelectionSort } from "./renderers/RendererSelectionSort";
import { RendererMergeSort } from "./renderers/RendererMergeSort";
import { RendererHeapSort } from "./renderers/RendererHeapSort";
import { RendererQuickSort } from "./renderers/RendererQuickSort";
import { RendererCountingSort } from "./renderers/RendererCountingSort";
import { generateDataset } from "renderers/helper/shuffle";
import { RendererRadixSort } from "renderers/RendererRadixSort/RendererRadixSort";

type TabPanelProps = {
	index: number;
	value: number;
	children:
		| React.ReactElement[]
		| React.ReactElement;
};
const TabPanel: FC<TabPanelProps> = (props) => {
	const { index, value, children } = props;

	if (value !== index) {
		return <Fragment />;
	}

	return <Box>{children}</Box>;
};

export const App = () => {
	const [tabIndex, setTabIndex] =
		useState<number>(0);

	const [dataset] = useState<number[]>(
		generateDataset(10),
	);

	// const onDatasetSizeChange = (
	// 	event: ChangeEvent<
	// 		HTMLTextAreaElement | HTMLInputElement
	// 	>,
	// ): void => {
	// 	const value: string = event.target.value;
	// 	let size: number = Number.parseInt(value);

	// 	if (Number.isNaN(size)) {
	// 		size = 3;
	// 	}
	// 	if (size > 10 || size < 3) {
	// 		return;
	// 	}

	// 	setDataset(generateDataset(size));
	// };

	// const onDatasetShuffle = (): void => {
	// 	setDataset([...shuffle(dataset)]);
	// };

	const onTabIndexChange = (
		_: React.SyntheticEvent,
		value: string,
	) => {
		setTabIndex(Number.parseInt(value));
	};

	return (
		<Fragment>
			<CssBaseline enableColorScheme />
			<Container maxWidth="md">
				<Stack
					spacing={2}
					marginY={2}
				>
					<Typography variant="h2">
						Visualizers
					</Typography>
					<Tabs
						value={tabIndex}
						onChange={onTabIndexChange}
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab
							value={0}
							label="Bubble sort"
						/>
						<Tab
							value={1}
							label="Insertion sort"
						/>
						<Tab
							value={2}
							label="Selection sort"
						/>
						<Tab
							value={3}
							label="Merge sort"
						/>
						<Tab
							value={4}
							label="Heapsort"
						/>
						<Tab
							value={5}
							label="Quicksort"
						/>
						<Tab
							value={6}
							label="Counting sort"
						/>
						<Tab
							value={7}
							label="Radix sort"
						/>
					</Tabs>
					<Box>
						<TabPanel
							index={tabIndex}
							value={0}
						>
							<RendererBubbleSort
								heightPx={300}
								dataset={dataset}
							/>
						</TabPanel>
						<TabPanel
							index={tabIndex}
							value={1}
						>
							<RendererInsertionSort
								heightPx={300}
								dataset={dataset}
							/>
						</TabPanel>
						<TabPanel
							index={tabIndex}
							value={2}
						>
							<RendererSelectionSort
								heightPx={300}
								dataset={dataset}
							/>
						</TabPanel>
						<TabPanel
							index={tabIndex}
							value={3}
						>
							<RendererMergeSort
								dataset={dataset}
								heightPx={300}
							/>
						</TabPanel>
						<TabPanel
							index={tabIndex}
							value={4}
						>
							<RendererHeapSort
								dataset={dataset}
								heightPx={300}
							/>
						</TabPanel>
						<TabPanel
							index={tabIndex}
							value={5}
						>
							<RendererQuickSort
								dataset={dataset}
								heightPx={300}
							/>
						</TabPanel>
						<TabPanel
							index={tabIndex}
							value={6}
						>
							<RendererCountingSort
								dataset={dataset}
								heightPx={300}
							/>
						</TabPanel>
						<TabPanel
							index={tabIndex}
							value={7}
						>
							<RendererRadixSort
								dataset={dataset}
								heightPx={300}
							/>
						</TabPanel>
					</Box>
					{/* <Typography variant="h2">
						Configuration
					</Typography>
					<Stack
						alignContent="start"
						direction="row"
						spacing={2}
					>
						<TextField
							fullWidth
							label="Size"
							defaultValue={25}
							onChange={onDatasetSizeChange}
						/>
						<Button
							fullWidth
							variant="contained"
							onClick={onDatasetShuffle}
						>
							Shuffle
						</Button>
					</Stack> */}
				</Stack>
			</Container>
		</Fragment>
	);
};

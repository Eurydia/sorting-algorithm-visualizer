import "./styles/App.css";

import { FC, Fragment, useState } from "react";

import {
	Container,
	Stack,
	CssBaseline,
	Typography,
	Box,
	Tabs,
	Tab,
} from "@mui/material";

import { RendererBubbleSort } from "./renderers/RendererBubbleSort";
import { RendererInsertionSort } from "./renderers/RendererInsertionSort";
import { RendererMergeSort } from "./renderers/RendererMergeSort";
import { RendererSelectionSort } from "./renderers/RendererSelectionSort";
import { RendererHeapSort } from "./renderers/RendererHeapSort";
import { RendererQuickSort } from "./renderers/RendererQuickSort";
import { RendererCountingSort } from "./renderers/RendererCountingSort";

type TabPanleProps = {
	index: number;
	value: number;
	children:
		| React.ReactElement[]
		| React.ReactElement;
};
const TabPanel: FC<TabPanleProps> = (props) => {
	const { index, value, children } = props;

	if (value !== index) {
		return <Fragment />;
	}

	return <Box>{children}</Box>;
};

export const App = () => {
	const [tabIndex, setTabIndex] =
		useState<number>(0);

	const onTabIndexChange = (
		_: React.SyntheticEvent,
		value: string,
	) => {
		setTabIndex(Number.parseInt(value));
	};

	const dataset: number[] = [
		20, 14, 8, 5, 21, 17, 2, 11, 24, 13, 3, 6, 25,
		15, 19, 16, 12, 18, 10, 1, 9, 4, 22, 7, 23,
	];

	return (
		<Fragment>
			<CssBaseline enableColorScheme />
			<Container maxWidth="md">
				<Stack spacing={2}>
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
							label="Merge sort"
						/>
						<Tab
							value={3}
							label="Selection sort"
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
					</Tabs>

					<TabPanel
						index={tabIndex}
						value={0}
					>
						<RendererBubbleSort
							dataset={dataset}
						/>
					</TabPanel>
					<TabPanel
						index={tabIndex}
						value={1}
					>
						<RendererInsertionSort
							dataset={dataset}
						/>
					</TabPanel>
					<TabPanel
						index={tabIndex}
						value={2}
					>
						<RendererMergeSort
							dataset={dataset}
						/>
					</TabPanel>
					<TabPanel
						index={tabIndex}
						value={3}
					>
						<RendererSelectionSort
							dataset={dataset}
						/>
					</TabPanel>
					<TabPanel
						index={tabIndex}
						value={4}
					>
						<RendererHeapSort dataset={dataset} />
					</TabPanel>
					<TabPanel
						index={tabIndex}
						value={5}
					>
						<RendererQuickSort
							dataset={dataset}
						/>
					</TabPanel>
					<TabPanel
						index={tabIndex}
						value={6}
					>
						<RendererCountingSort
							dataset={dataset}
						/>
					</TabPanel>
				</Stack>
			</Container>
		</Fragment>
	);
};

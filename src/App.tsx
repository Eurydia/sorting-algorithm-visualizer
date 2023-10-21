import { Fragment } from "react";

import {
	Container,
	Stack,
	CssBaseline,
	Typography,
} from "@mui/material";

import { RendererBubbleSort } from "./renderers/RendererBubbleSort";
import { RendererInsertionSort } from "./renderers/RendererInsertionSort";
import { RendererMergeSort } from "./renderers/RendererMergeSort";
import { RendererSelectionSort } from "./renderers/RendererSelectionSort";
import { RendererHeapSort } from "./renderers/RendererHeapSort";
import { RendererQuickSort } from "./renderers/RendererQuickSort";

export const App = () => {
	const dataset: number[] = [
		20, 14, 8, 5, 21, 17, 2, 11, 24, 13, 3, 6, 25,
		15, 19, 16, 12, 18, 10, 1, 9, 4, 22, 7, 23,
	];

	return (
		<Fragment>
			<CssBaseline enableColorScheme />
			<Container maxWidth="md">
				<Stack spacing={2}>
					<Typography variant="h2">
						Bubble Sort
					</Typography>
					<div id="bubble-sort">
						<RendererBubbleSort
							dataset={dataset}
							size={dataset.length}
							maxValue={Math.max(...dataset)}
						/>
					</div>
					<Typography variant="h2">
						Insertion Sort
					</Typography>
					<div id="insertion-sort">
						<RendererInsertionSort
							dataset={dataset}
							size={dataset.length}
							maxValue={Math.max(...dataset)}
						/>
					</div>
					<Typography variant="h2">
						Merge Sort
					</Typography>
					<div id="merge-sort">
						<RendererMergeSort
							dataset={dataset}
							size={dataset.length}
							maxValue={Math.max(...dataset)}
						/>
					</div>
					<Typography variant="h2">
						Selection Sort
					</Typography>
					<div id="selection-sort">
						<RendererSelectionSort
							dataset={dataset}
							size={dataset.length}
							maxValue={Math.max(...dataset)}
						/>
					</div>
					<Typography variant="h2">
						Heap Sort
					</Typography>
					<div id="heap-sort">
						<RendererHeapSort
							dataset={dataset}
							size={dataset.length}
							maxValue={Math.max(...dataset)}
						/>
					</div>
					<Typography variant="h2">
						Quick Sort
					</Typography>
					<div id="quick-sort">
						<RendererQuickSort
							dataset={dataset}
							size={dataset.length}
							maxValue={Math.max(...dataset)}
						/>
					</div>
				</Stack>
			</Container>
		</Fragment>
	);
};
